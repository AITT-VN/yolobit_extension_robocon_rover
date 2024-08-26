import time
from machine import *
from micropython import const
from rover import *

STOP = const(0)
BRAKE = const(1)

DIR_CENTER = const(0)
DIR_LEFT = const(1)
DIR_RIGHT = const(2)
DIR_STRONG_LEFT = const(3)
DIR_STRONG_RIGHT = const(4)
DIR_CROSS_LEFT = const(5)
DIR_CROSS_RIGHT = const(6)
DIR_NO_LINE = const(7)
DIR_CROSS_LINE = const(8)

def stop_rover(then=STOP):
    if then == STOP:
        rover.stop()
    elif then == BRAKE:
        rover.ina1.duty(1023)
        rover.ina2.duty(1023)
        rover.inb1.duty(1023)
        rover.inb2.duty(1023)
        time.sleep_ms(150)
        rover.stop()
    else:
        return

m_dir = -1 #no found
last_dir = -1
dir_count = 0

t_finding_point = time.time_ns()
s1_current_position = -1
s2_current_position = -1

robocon_servos = {}
robocon_servos_pos = {}
robocon_servos_limits = {}

def follow_line(speed, now=None, backward=True):
    global m_dir, last_dir, dir_count, t_finding_point
    ratio = [1, 1]
    if now == None:
        now = rover.read_line_sensors()

    if now == (0, 0, 0, 0): #no line found
        if backward:
            m_dir = DIR_NO_LINE
            rover.backward(speed)
            return
    elif now == (1, 1, 1, 1): # crossed line found
        m_dir = DIR_CROSS_LINE
        ratio = [1, 1]
    elif (now[1], now[2]) == (1, 1):
        m_dir = DIR_CENTER
        dir_count = 0
        if last_dir == DIR_CENTER:
            ratio = [1, 1]
        else:
            ratio = [0.75, 0.75]
    elif now == (0, 1, 0, 0):
        m_dir = DIR_RIGHT
        ratio = [0.5, 1]
    elif now == (0, 0, 1, 0):
        m_dir = DIR_LEFT
        ratio = [1, 0.5]
    elif now == (1, 1, 0, 0) or now == (1, 1, 1, 0):
        m_dir = DIR_STRONG_RIGHT
        ratio = [0, 1]
    elif now == (0, 0, 1, 1) or now == (0, 1, 1, 1):
        m_dir = DIR_STRONG_LEFT
        ratio = [1, 0]
    elif now == (1, 0, 0, 0):
        m_dir = DIR_CROSS_LEFT
        ratio = [-0.75, 0.75]
    elif now == (0, 0, 0, 1):
        m_dir = DIR_CROSS_RIGHT
        ratio = [0.75, -0.75]
    else:
        m_dir = DIR_CENTER
        ratio = [1, 1]
        dir_count = 0

    if m_dir == last_dir:
        dir_count += 1
    else:
        dir_count = 0
    
    last_dir = m_dir

    rover.set_wheel_speed( (speed+dir_count) * ratio[0], (speed+dir_count) * ratio[1] )


def follow_line_until_end(speed, timeout=10000, then=STOP):
    global m_dir, dir_count
    m_dir = -1
    dir_count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if speed >= 0:
            follow_line(speed, now, False)
        else:
            rover.backward(abs(speed))

        if m_dir == DIR_NO_LINE and dir_count >= 3:
            break

        time.sleep_ms(10)

    stop_rover(then)

def follow_line_until_cross(speed, timeout=10000, then=STOP):
    status = 1
    global m_dir, dir_count
    m_dir = -1
    dir_count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if speed >= 0:
            follow_line(speed, now)
        else:
            rover.backward(abs(speed))

        if status == 1:
            if m_dir != DIR_CROSS_LINE:
                status = 2
        elif status == 2:
            if m_dir == DIR_CROSS_LINE and dir_count >= 2:
                break

        time.sleep_ms(10)

    rover.forward(speed, 0.1)
    stop_rover(then)

def follow_line_until(speed, condition, timeout=10000, then=STOP):
    status = 1
    count = 0
    global m_dir, dir_count
    m_dir = -1
    dir_count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if speed >= 0:
            follow_line(speed, now)
        else:
            rover.backward(abs(speed))

        if status == 1:
            if m_dir != DIR_CROSS_LINE:
                status = 2
        elif status == 2:
            if condition():
                count = count + 1
                if count == 2:
                    break

        time.sleep_ms(10)

    stop_rover(then)

def turn_until_line_detected(m1_speed, m2_speed, timeout=5000, then=STOP):
    counter = 0
    status = 0
  
    last_time = time.ticks_ms()

    rover.set_wheel_speed(m1_speed, m2_speed)

    while time.ticks_ms() - last_time < timeout:
        line_status = rover.read_line_sensors()

        if status == 0:
            if line_status == (0, 0, 0, 0): # no black line detected
                # ignore case when robot is still on black line since started turning
                status = 1
        
        elif status == 1:
            rover.set_wheel_speed(m1_speed, m2_speed)
            status = 2
            counter = 3
        elif status == 2:
            if line_status[0] == 1 or line_status[1] == 1 or line_status[2] == 1 or line_status[3] == 1:
                rover.set_wheel_speed(int(m1_speed*0.75), int(m2_speed*0.75))
                counter = counter - 1
                if counter <= 0:
                    break

        time.sleep_ms(10)

    stop_rover(then)

def turn_until_condition(m1_speed, m2_speed, condition, timeout=5000, then=STOP):
    count = 0

    rover.set_wheel_speed(m1_speed, m2_speed)

    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        if condition():
            count = count + 1
            if count == 3:
                break
        time.sleep_ms(10)

    stop_rover(then)

def ball_launcher(index_1=0, index_2=1, mode=-1):
    servo_1 = index_1 + 1
    servo_2 = index_2 + 1
    if mode == 1:
        rover.servo_write(servo_1, 90)
    if mode == 0:
        rover.servo_write(servo_1, 90)
        time.sleep_ms(250)
        rover.servo_write(servo_2, 180)
        time.sleep_ms(250)
        rover.servo_write(servo_1, 0)
        time.sleep_ms(250)
        rover.servo_write(servo_2, 0)
        time.sleep_ms(250)

def servo_write(servo_pin, value):
    if value < 0:
        value = 0
    elif value > 180:
        value = 180

    if servo_pin not in robocon_servos:
        robocon_servos[servo_pin] = PWM(Pin(servo_pin), freq=50, duty=0)
        if servo_pin not in robocon_servos_limits:
            robocon_servos_limits[servo_pin] = (0, 180)

    if value < robocon_servos_limits[servo_pin][0]:
        value = robocon_servos_limits[servo_pin][0]
    
    if value > robocon_servos_limits[servo_pin][1]:
        value = robocon_servos_limits[servo_pin][1]

    # duty for servo is between 25 - 115
    duty = 25 + int((value/180)*100)
    robocon_servos[servo_pin].duty(duty)
    robocon_servos_pos[servo_pin] = value

def servo360_write(servo_pin, speed):
    if speed < -100:
        speed = -100
    elif speed > 100:
        speed = 100

    if speed == 0:
        servo_write(servo_pin, 0)
        return
    else:
        degree = 90 - (speed/100)*90
        servo_write(servo_pin, degree)

def set_servo_position(pin, next_position, speed=70):        
    if speed < 0:
        speed = 0
    elif speed > 100:
        speed = 100
    
    sleep = int(translate(speed, 0, 100, 100, 0))

    if pin in robocon_servos_pos:
        current_position = robocon_servos_pos[pin]
    else:
        current_position = 0
        servo_write(pin, 0) # first time control

    if next_position < current_position:
        for i in range(current_position, next_position, -1):
            servo_write(pin, i)
            time.sleep_ms(sleep)
    else:
        for i in range(current_position, next_position):
            servo_write(pin, i)
            time.sleep_ms(sleep)

def move_servo_position(pin, angle):
    if pin in robocon_servos_pos:
        current_position = robocon_servos_pos[pin]
    else:
        current_position = 0
    next_position = current_position + angle    
    servo_write(pin, next_position)

def set_servo_limit(pin, min, max):
    robocon_servos_limits[pin] = (min, max)

