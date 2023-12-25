import time
from micropython import const
from rover import *
from yolobit import *
from machine import Pin, SoftI2C
from utility import *
from ble import *
import gamepad

BTN_FORWARD = '!B516'
BTN_BACKWARD = '!B615'
BTN_LEFT = '!B714'
BTN_RIGHT = '!B814'

BTN_A = '!B11:'
BTN_B = '!B219'
BTN_C = '!B318'
BTN_D = '!B417'


class RemoteControlMode():

    def __init__(self):
        self._speed = 50
        self._cmd = None
        self._last_cmd = None
        
        self._cmd_handlers = {
            BTN_A: None,
            BTN_B: None,
            BTN_C: None,
            BTN_D: None,
        }
        
        self._i2c_gp = SoftI2C(scl=Pin(22), sda=Pin(21), freq=100000)
        if self._i2c_gp.scan().count(0x55) == 0:
            self._gamepad_v2 = None
            raise OSError('Gamepad V2 Receiver not found {:#x}'.format(0x55))
        else:
            self._gamepad_v2 = gamepad.GamePadReceiver(self._i2c_gp)
        
        ble.on_receive_msg('string', self.on_ble_cmd_received)

    def on_ble_cmd_received(self, cmd):
        print('New command: ', cmd)
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
                    self._cmd = BTN_C
                elif self._gamepad_v2.data['b']:
                    self._cmd = BTN_D
                elif self._gamepad_v2.data['x']:
                    self._cmd = BTN_A
                elif self._gamepad_v2.data['y']:
                    self._cmd = BTN_B
                else:
                    self._cmd = '!507'

        if self._cmd != self._last_cmd: # got new command
            self._speed = 20 # reset speed
        else:
            if self._speed < 50:
                self._speed = self._speed + 1
            else:
                self._speed = 50

        if self._cmd == BTN_FORWARD:
            rover.forward(self._speed*2)

        elif self._cmd == BTN_BACKWARD:
            rover.backward(self._speed*2)

        elif self._cmd == BTN_LEFT:
            rover.turn_left(self._speed)

        elif self._cmd == BTN_RIGHT:
            rover.turn_right(self._speed)
        
        elif self._cmd in self._cmd_handlers:
            if self._cmd_handlers[self._cmd] != None:
                self._cmd_handlers[self._cmd]()
        
        else:
            rover.stop()
        
        self._last_cmd = self._cmd

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
