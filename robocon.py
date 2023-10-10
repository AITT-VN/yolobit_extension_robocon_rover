import time
from rover import *

speed_factors = [ 
    [1, 1], [0.5, 1], [0, 1], [-0.5, 0.5], 
    [-2/3, -2/3], [0, 1], [-0.5, 0.5], [-0.7, 0.7] 
] #0: forward, 1: light turn, 2: normal turn, 3: heavy turn, 4:  backward, 5: strong light turn, 6: strong normal turn, 7: strong heavy turn


m_dir = -1 #no found
i_lr = 0 #0 for left, 1 for right
t_finding_point = time.time_ns()
current_position = 90

def follow_line(speed):
    global m_dir, i_lr, t_finding_point
    now = rover.read_line_sensors()

    if now == (0, 0, 0, 0): #no line found
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


def follow_line_until(speed, condition, timeout=10000):
    count = 0
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        if condition():
            count = count + 1
            if count == 2:
                break

        if speed >= 0:
            follow_line(speed)
        else:
            rover.backward(abs(speed))

        time.sleep_ms(5)

    rover.stop()

def turn_until_line_detected(m1_speed, m2_speed, timeout=5000):
    count = 0
    sensor_index = 1

    if m1_speed > m2_speed:
        sensor_index = 2
 
    last_line_status = rover.read_line_sensors(sensor_index+1)
  
    rover.set_wheel_speed(m1_speed, m2_speed)
  
    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        current_line_status = rover.read_line_sensors()

        if current_line_status[sensor_index] == 1: # black line detected
	          # ignore case when robot is still on black line since started turning
            if last_line_status == 1 or time.ticks_ms() - last_time < 500:
                continue
            else:
                if current_line_status[0] or current_line_status[1] or current_line_status[2] or current_line_status[3]:
                    count = count + 1

                    # only considered as black line detected after 2 times reading                
                    if count > 2:
                        break
        else: # meet white background
            last_line_status = 0

    rover.stop()

    time.sleep_ms(500) # time stop

    if rover.read_line_sensors() == (0, 0, 0, 0): # moved off black line
        last_time = time.ticks_ms()
        while time.ticks_ms() - last_time < 500: # max timeout 500ms
            rover.set_wheel_speed(-(m1_speed), -(m2_speed)) # turning back when meet white background
            line_status = rover.read_line_sensors()
            if line_status[0] or line_status[1] or line_status[2] or line_status[3]: #check line sensor meet black line
                #rover.stop()
                break

            #time.sleep_ms(20)

    rover.stop()
    time.sleep_ms(500)

def turn_until_condition(m1_speed, m2_speed, condition, timeout=5000):
    count = 0

    rover.set_wheel_speed(m1_speed, m2_speed)

    last_time = time.ticks_ms()

    while time.ticks_ms() - last_time < timeout:
        if condition():
            count = count + 1
            if count == 3:
                break
        time.sleep_ms(10)

    rover.stop()
    time.sleep_ms(500)

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


def set_servo_position(pin, next_position , speed=80):
    global current_position 
    sleep = translate(speed, 0, 100, 50, 0.1)

    if speed == 0:
        return
    
    if next_position < 0:
        next_position = 0

    if next_position > 90:
        next_position = 90
        
    if next_position < current_position:
        for i in range(current_position, next_position, -1):
            rover.servo_write(pin, i)
            time.sleep_ms(int(sleep))
    else:
        for i in range(current_position, next_position):
            rover.servo_write(pin, i)
            time.sleep_ms(int(sleep))

    current_position = next_position

