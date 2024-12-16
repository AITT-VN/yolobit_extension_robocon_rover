import time
from micropython import const
from rover import *
from yolobit import *
from machine import Pin, SoftI2C
from utility import *
from ble import *
import gamepad

GAMEPAD_RECEIVER_ADDR = const(0x55)

# gamepad buttons
BTN_FORWARD = '!B516'
BTN_BACKWARD = '!B615'
BTN_LEFT = '!B714'
BTN_RIGHT = '!B814'

BTN_A = '!B11:'
BTN_B = '!B219'
BTN_C = '!B318'
BTN_D = '!B417'

BTN_SQUARE = 'SQ'
BTN_TRIANGLE = 'TR'
BTN_CROSS = 'CR'
BTN_CIRCLE = 'CI'

BTN_L1 = 'L1'
BTN_R1 = 'R1'
BTN_L2 = 'L2'
BTN_R2 = 'R2'

BTN_M1 = 'M1'
BTN_M2 = 'M2'
BTN_THUMBL = 'THUMBL'
BTN_THUMBR = 'THUMBR'

AL = 'AL'
ALX = 'ALX'
ALY = 'ALY'
AL_DIR = 'AL_DIR'
AL_DISTANCE = 'AL_DISTANCE'
AR = 'AR'
ARX = 'ARX'
ARY = 'ARY'
AR_DIR = 'AR_DIR'
AR_DISTANCE = 'AR_DISTANCE'

BTN_RELEASED = '!507'

MOVE1 = const(0)
MOVE2 = const(1)
MOVE3 = const(2)
MOVE4 = const(3)
MOVE5 = const(4)
MOVE6 = const(5)
MOVE7 = const(6)
MOVE8 = const(7)


class RemoteControlMode():

    def __init__(self):
        self._speed = 50
        self._cmd = None
        self._last_cmd = None
        
        self._cmd_handlers = {
            BTN_FORWARD: None,
            BTN_BACKWARD: None,
            BTN_LEFT: None,
            BTN_RIGHT: None,

            BTN_A: None,
            BTN_B: None,
            BTN_C: None,
            BTN_D: None,

            BTN_SQUARE: None,
            BTN_TRIANGLE: None,
            BTN_CROSS: None,
            BTN_CIRCLE: None,

            BTN_L1: None,
            BTN_R1: None,
            BTN_L2: None,
            BTN_R2: None,

            BTN_M1: None,
            BTN_M2: None,
            BTN_THUMBL: None,
            BTN_THUMBR: None,
        }
        
        self._i2c_gp = SoftI2C(scl=Pin(pin19.pin), sda=Pin(pin20.pin), freq=100000)
        if self._i2c_gp.scan().count(GAMEPAD_RECEIVER_ADDR) == 0:
            self._gamepad_v2 = None
            print('Gamepad V2 Receiver not found {:#x}'.format(GAMEPAD_RECEIVER_ADDR))
        else:
            self._gamepad_v2 = gamepad.GamePadReceiver(self._i2c_gp)
        
        ble.on_receive_msg('string', self.on_ble_cmd_received)

    def on_ble_cmd_received(self, cmd):
        #print('New command: ', cmd)
        self._cmd = cmd
    
    def set_command(self, cmd, handler):
        if cmd not in self._cmd_handlers:
            print('Invalid remote control command')
            return

        self._cmd_handlers[cmd] = handler

    def run(self):
        # read command from gamepad v2 receiver if connected
        if self._gamepad_v2 != None:
            # read status
            x, y, angle, dir, distance = self._gamepad_v2.read_joystick(0)
            
            self._gamepad_v2.update()

            if self._gamepad_v2._isconnected == True:
                if self._gamepad_v2.data['dpad_up']:
                    self._cmd = BTN_FORWARD
                elif self._gamepad_v2.data['dpad_down']:
                    self._cmd = BTN_BACKWARD
                elif self._gamepad_v2.data['dpad_left']:
                    self._cmd = BTN_LEFT
                elif self._gamepad_v2.data['dpad_right']:
                    self._cmd = BTN_RIGHT
                elif self._gamepad_v2.data['a']:
                    self._cmd = BTN_CROSS
                elif self._gamepad_v2.data['b']:
                    self._cmd = BTN_CIRCLE
                elif self._gamepad_v2.data['x']:
                    self._cmd = BTN_SQUARE
                elif self._gamepad_v2.data['y']:
                    self._cmd = BTN_TRIANGLE
                elif self._gamepad_v2.data['l1']:
                    self._cmd = BTN_L1
                elif self._gamepad_v2.data['r1']:
                    self._cmd = BTN_R1
                elif self._gamepad_v2.data['l2']:
                    self._cmd = BTN_L2
                elif self._gamepad_v2.data['r2']:
                    self._cmd = BTN_R2
                elif self._gamepad_v2.data['m1']:
                    self._cmd = BTN_M1
                elif self._gamepad_v2.data['m2']:
                    self._cmd = BTN_M2
                elif self._gamepad_v2.data['thumbl']:
                    self._cmd = BTN_THUMBL
                elif self._gamepad_v2.data['thumbr']:
                    self._cmd = BTN_THUMBR
                elif dir == 5:
                    self._cmd = MOVE1
                elif dir == 4:
                    self._cmd = MOVE2
                elif dir == 3:
                    self._cmd = MOVE3
                elif dir == 2:
                    self._cmd = MOVE4
                elif dir == 1:
                    self._cmd = MOVE5
                elif dir == 8:
                    self._cmd = MOVE6
                elif dir == 7:
                    self._cmd = MOVE7
                elif dir == 6:
                    self._cmd = MOVE8
                else:
                    self._cmd = BTN_RELEASED

        if self._cmd != self._last_cmd: # got new command
            self._speed = 25 # reset speed
        else:
            if self._speed < 60:
                self._speed = int(self._speed + 0.5)
            else:
                self._speed = 60

        if self._cmd_handlers.get(self._cmd) != None:
            self._cmd_handlers[self._cmd]()
        elif self._cmd == BTN_FORWARD:
            s = self._speed*2
            if s > 100:
                s = 100
            rover.forward(s)

        elif self._cmd == BTN_BACKWARD:
            s = self._speed*2
            if s > 100:
                s = 100
            rover.backward(s)

        elif self._cmd == BTN_LEFT:
            rover.turn_left(self._speed)

        elif self._cmd == BTN_RIGHT:
            rover.turn_right(self._speed)

        elif self._cmd == MOVE1:
            rover.turn_right(self._speed)
            
        elif self._cmd == MOVE5:
            rover.turn_left(self._speed)
            
        elif self._cmd == MOVE3:
            rover.forward(self._speed)
            
        elif self._cmd == MOVE7:
            rover.backward(self._speed)
            
        elif self._cmd == MOVE2:
            rover.set_wheel_speed(self._speed, self._speed/2)
            
        elif self._cmd == MOVE4:
            rover.set_wheel_speed(self._speed/2, self._speed)
            
        elif self._cmd == MOVE6:
            rover.set_wheel_speed(-(self._speed/2), - self._speed)
            
        elif self._cmd == MOVE8:
            rover.set_wheel_speed(-self._speed, -self._speed/2)
        
        else:
            rover.stop()

        self._last_cmd = self._cmd
    
    def read_gamepad(self, data):
        if self._gamepad_v2 != None and self._gamepad_v2._isconnected == True:
            return self._gamepad_v2.data[data]
        else:
            return 0

rc_mode = RemoteControlMode()

''' 

# Example code

def on_gamepad_button_A():
    # button A: lift down and release gripper
    rover.servo_write(2, 0)
    time.sleep_ms(500)
    rover.servo_write(1, 0)

def on_gamepad_button_D():
    # button D: collect and lift up gripper
    rover.servo_write(1, 90)
    time.sleep_ms(500)
    rover.servo_write(2, 90)

# allow user to config what to do when a gamepad button pressed
rc_mode.set_command(BTN_A, on_gamepad_button_A)
rc_mode.set_command(BTN_D, on_gamepad_button_D)

while True:
    rc_mode.run()
    time.sleep_ms(50)

'''