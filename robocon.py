import time
from rover import *

STOP = const(0)
BRAKE = const(1)

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

speed_factors = [ 
    [1, 1], [0.5, 1], [0, 1], [-0.5, 0.5], 
    [-2/3, -2/3], [0, 1], [-0.5, 0.5], [-0.7, 0.7] 
] #0: forward, 1: light turn, 2: normal turn, 3: heavy turn, 4:  backward, 5: strong light turn, 6: strong normal turn, 7: strong heavy turn


m_dir = -1 #no found
i_lr = 0 #0 for left, 1 for right
t_finding_point = time.time_ns()
s1_current_position = -1
s2_current_position = -1

def follow_line(speed, now=None, backward=True):
    global m_dir, i_lr, t_finding_point
    if now == None:
        now = rover.read_line_sensors()

    if now == (0, 0, 0, 0): #no line found
        if backward:
            rover.backward(speed)
    else:
        if (now[1], now[2]) == (1, 1):
            if m_dir == 0:
                rover.set_wheel_speed(speed, speed) #if it is running straight before then robot should speed up now           
            else:
                m_dir = 0 #forward
                rover.set_wheel_speed(speed * 2/3, speed * 2/3) #just turn before, shouldn't set high speed immediately, speed up slowly
        else:
            if (now[0], now[1]) == (1, 1): 
                m_dir = 2 #left normal turn
                i_lr = 0
            elif (now[2], now[3]) == (1, 1): 
                m_dir = 2 #right normal turn
                i_lr = 1
            elif now == (1, 0, 1, 0): 
                if m_dir != -1:
                    m_dir = 1
                    i_lr = 0
            elif now == (0, 1, 0, 1): 
                if m_dir != -1:
                    m_dir = 1
                    i_lr = 1
            elif now == (1, 0, 0, 1): 
                if m_dir != -1:
                    m_dir = 0
                    i_lr = 0
            elif now[1] == 1: 
                m_dir = 1 #left light turn
                i_lr = 0
            elif now[2] == 1:
                m_dir = 1 #right light turn
                i_lr = 1
            elif now[0] == 1: 
                m_dir = 3 #left heavy turn
                i_lr = 0
            elif now[3] == 1: 
                m_dir = 3 #right heavy turn
                i_lr = 1

            rover.set_wheel_speed( speed * speed_factors[m_dir][i_lr], speed * speed_factors[m_dir][1-i_lr] )


def follow_line_until_end(speed, timeout=10000, then=STOP):
    count = 3
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if now == (0, 0, 0, 0):
            count = count - 1
            if count == 0:
                break

        if speed >= 0:
            follow_line(speed, now, False)
        else:
            rover.backward(abs(speed))

        time.sleep_ms(10)

    stop_rover(then)

def follow_line_until_cross(speed, timeout=10000, then=STOP):
    status = 1
    count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if status == 1:
            if now != (1, 1, 1, 1):
                status = 2
        elif status == 2:
            if now == (1, 1, 1, 1):
                count = count + 1
                if count == 2:
                    break

        if speed >= 0:
            follow_line(speed, now)
        else:
            rover.backward(abs(speed))

        time.sleep_ms(10)

    rover.forward(speed, 0.1)
    stop_rover(then)

def follow_line_until(speed, condition, timeout=10000, then=STOP):
    status = 1
    count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        now = rover.read_line_sensors()

        if status == 1:
            if now != (1, 1, 1, 1):
                status = 2
        elif status == 2:
            if condition():
                count = count + 1
                if count == 2:
                    break

        if speed >= 0:
            follow_line(speed, now)
        else:
            rover.backward(abs(speed))

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


def set_servo_position(pin, next_position, speed=70):
    global s1_current_position, s2_current_position
    current_position = 0
        
    if speed < 0 or speed > 100:
        print('Invalid servo speed')
        return
    
    sleep = translate(speed, 0, 100, 100, 0)
    
    if next_position < 0:
        next_position = 0

    if next_position > 180:
        next_position = 180
    
    if pin == 1:
        if s1_current_position == -1:
            rover.servo_write(pin, next_position)
            s1_current_position = next_position
            return
        else:    
            current_position = s1_current_position
    else:
        if s2_current_position == -1:
            rover.servo_write(pin, next_position)
            s2_current_position = next_position
            return
        else:
            current_position = s2_current_position
    
    if next_position < current_position:
        for i in range(current_position, next_position, -1):
            rover.servo_write(pin, i)
            time.sleep_ms(int(sleep))
    else:
        for i in range(current_position, next_position):
            rover.servo_write(pin, i)
            time.sleep_ms(int(sleep))

    if pin == 1:
        s1_current_position = next_position
    else:
        s2_current_position = next_position
