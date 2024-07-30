
const ColorBlock = '#cb2026';
const ImgUrl = 'https://ohstem-public.s3.ap-southeast-1.amazonaws.com/extensions/AITT-VN/yolobit_extension_robocon_rover/images/';

Blockly.Blocks['robocon_follow_line_until_cross'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_follow_line_until_cross",
        "message0": Blockly.Msg.ROBOCON_FOLLOW_LINE_CROSS_MESSAGE0,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOCON_THEN_ACTION_STOP, "STOP"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_BRAKE, "BRAKE"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_FOLLOW_LINE_CROSS_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_FOLLOW_LINE_CROSS_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_follow_line_until_cross"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "follow_line_until_cross(" + speed + ", 15000, " + stop + ")\n";
  return code;
};

Blockly.Blocks['robocon_follow_line_until_end'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_follow_line_until_end",
        "message0": Blockly.Msg.ROBOCON_FOLLOW_LINE_END_MESSAGE0,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOCON_THEN_ACTION_STOP, "STOP"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_BRAKE, "BRAKE"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_FOLLOW_LINE_END_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_FOLLOW_LINE_END_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_follow_line_until_end"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "follow_line_until_end(" + speed + ", 15000, " + stop + ")\n";
  return code;
};

Blockly.Blocks['robocon_turn_until_line_detected_then'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_turn_until_line_detected_then",
        "message0": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_THEN_MESSAGE0,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [
                {
                  "src": "static/blocks/block_images/860774.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "left"
              ],
              [
                {
                  "src": "static/blocks/block_images/74474.svg",
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "right"
              ]
            ]
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
          },
          {
            type: "field_dropdown",
            name: "stop",
            options: [
              [Blockly.Msg.ROBOCON_THEN_ACTION_STOP, "STOP"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_BRAKE, "BRAKE"],
              [Blockly.Msg.ROBOCON_THEN_ACTION_NONE, "None"],
            ]
          },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_THEN_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_THEN_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_turn_until_line_detected_then"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var dir = block.getFieldValue('direction');
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var stop = block.getFieldValue('stop');
  // TODO: Assemble Python into code variable.
  var code = "";
  if (dir == "left") {
    code = "turn_until_line_detected(-" + speed + ", " + speed + ", 5000, " + stop + ")\n";
  } else {
    code = "turn_until_line_detected(" + speed + ", -" + speed + ", 5000, " + stop + ")\n";
  }
  return code;
};

Blockly.Blocks['robocon_follow_line_until'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_follow_line_until",
        "message0": Blockly.Msg.ROBOCON_FOLLOW_LINE_UNTIL_MESSAGE0,
        "args0": [
          {
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            "type": "input_value",
            "name": "condition",
          },
          {
            type: "input_value",
            check: "Number",
            name: "timeout",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_FOLLOW_LINE_UNTIL_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_FOLLOW_LINE_UNTIL_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_follow_line_until"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "follow_line_until(" + speed + ", " + "lambda: (" + condition + "), " + timeout * 1000 + ")\n";
  return code;
};

Blockly.Blocks['robocon_follow_line_delay'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_follow_line_delay",
        "message0": Blockly.Msg.ROBOCON_FOLLOW_LINE_DELAY_MESSAGE0,
        "args0": [

          {
            min: 0,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "speed",
          },
          {
            min: 0,
            type: "input_value",
            check: "Number",
            name: "timeout",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_FOLLOW_LINE_DELAY_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_FOLLOW_LINE_DELAY_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_follow_line_delay"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "follow_line_until(" + speed + ", " + "lambda: (False), " + timeout * 1000 + ")\n";
  return code;
};

Blockly.Blocks['robocon_turn_until_line_detected'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_move_motor",
        "message0": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_MESSAGE0,
        "args0": [
          {
            "type": "input_value",
            "name": "m1_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "m2_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "timeout",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_TURN_UNTIL_LINE_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_turn_until_line_detected"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var m1_speed = Blockly.Python.valueToCode(block, 'm1_speed', Blockly.Python.ORDER_ATOMIC);
  var m2_speed = Blockly.Python.valueToCode(block, 'm2_speed', Blockly.Python.ORDER_ATOMIC);
  var timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "turn_until_line_detected(" + m1_speed + ", " + m2_speed + ", " + timeout * 1000 + ")\n";
  return code;
};

Blockly.Blocks['robocon_turn_until_condition'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "robocon_move_motor",
        "message0": Blockly.Msg.ROBOCON_TURN_UNTIL_CONDITION_MESSAGE0,
        "args0": [
          {
            "type": "input_value",
            "name": "m1_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "m2_speed",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "condition",
            "check": "Boolean",
          },
          {
            "type": "input_value",
            "name": "timeout",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_TURN_UNTIL_CONDITION_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_TURN_UNTIL_CONDITION_HELPURL
      }
    );
  }
};

Blockly.Python["robocon_turn_until_condition"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var m1_speed = Blockly.Python.valueToCode(block, 'm1_speed', Blockly.Python.ORDER_ATOMIC);
  var m2_speed = Blockly.Python.valueToCode(block, 'm2_speed', Blockly.Python.ORDER_ATOMIC);
  var condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "turn_until_condition(" + m1_speed + ", " + m2_speed + ", " + "lambda: (" + condition + "), " + timeout * 1000 + ")\n";
  return code;
};

Blockly.Blocks['control_servo'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "control_servo",
        "message0": Blockly.Msg.ROBOCON_CONTROL_SERVO_MESSAGE0,
        "args0": [
          {
            type: "field_dropdown",
            name: "pin",
            options: [
              ["S1", "pin16.pin"],
              ["S2", "pin3.pin"],
              ["P0", "pin0.pin"],
              ["P1", "pin1.pin"],
            ]
          },
          {
            "type": "input_value",
            "name": "angle",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_CONTROL_SERVO_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_CONTROL_SERVO_HELPURL
      }
    );
  }
};

Blockly.Python["control_servo"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var angle_servo = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var dropdown_pin = block.getFieldValue('pin');
  var servo_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "set_servo_position(" + dropdown_pin + ", " + angle_servo + ", " + servo_speed + ")\n";
  return code;
};

Blockly.Blocks['limit_servo'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "limit_servo",
        "message0": Blockly.Msg.ROBOCON_LIMIT_SERVO_MESSAGE0,
        "args0": [
          {
            type: "field_dropdown",
            name: "pin",
            options: [
              ["S1", "pin16.pin"],
              ["S2", "pin3.pin"],
              ["P0", "pin0.pin"],
              ["P1", "pin1.pin"],
            ]
          },
          {
            "type": "input_value",
            "name": "min",
            "check": "Number",
          },
          {
            "type": "input_value",
            "name": "max",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_LIMIT_SERVO_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_LIMIT_SERVO_HELPURL
      }
    );
  }
};

Blockly.Python["limit_servo"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var dropdown_pin = block.getFieldValue('pin');
  var min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
  var max = Blockly.Python.valueToCode(block, 'max', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "set_servo_limit(" + dropdown_pin + ", " + min + ", " + max + ")\n";
  return code;
};

Blockly.Blocks['control_gripper'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "control_gripper",
        "message0": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_MESSAGE0,
        "args0": [
          {
            type: "field_dropdown",
            name: "action",
            options: [
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_LIFT, "lift_up"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_DROP, "lift_down"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_GRAB, "collect"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_OPEN, "release"],
            ]
          },
          {
            "type": "input_value",
            "name": "speed",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_HELPURL
      }
    );
  }
};

Blockly.Python["control_gripper"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var dropdown_type = block.getFieldValue('action');
  var rotate_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "";
  if (dropdown_type == 'collect')
    code = "set_servo_position(pin16.pin, 90, " + rotate_speed + ")\n";
  else if (dropdown_type == 'release')
    code = "set_servo_position(pin16.pin, 0, " + rotate_speed + ")\n";
  else if (dropdown_type == 'lift_up')
    code = "set_servo_position(pin3.pin, 90, " + rotate_speed + ")\n";
  else
    code = "set_servo_position(pin3.pin, 0, " + rotate_speed + ")\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Blocks['control_gripper_slow'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "control_gripper_slow",
        "message0": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_SLOW_MESSAGE0,
        "args0": [
          {
            type: "field_dropdown",
            name: "action",
            options: [
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_LIFT, "lift_up"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_DROP, "lift_down"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_GRAB, "collect"],
              [Blockly.Msg.ROBOCON_CONTROL_GRIPPER_OPEN, "release"],
            ]
          },
          {
            "type": "input_value",
            "name": "angle",
            "check": "Number",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_CONTROL_GRIPPER_HELPURL
      }
    );
  }
};

Blockly.Python["control_gripper_slow"] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_robocon'] = 'from robocon import *';
  var dropdown_type = block.getFieldValue('action');
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "";
  if (dropdown_type == 'collect')
    code = "move_servo_position(pin16.pin, -" + angle + ")\n";
  else if (dropdown_type == 'release')
    code = "move_servo_position(pin16.pin, " + angle + ")\n";
  else if (dropdown_type == 'lift_up')
    code = "move_servo_position(pin3.pin, " + angle + ")\n";
  else
    code = "move_servo_position(pin3.pin, -" + angle + ")\n";
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};


// GAMEPAD BLOCK

Blockly.Blocks['gamepad_init'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_init",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_INIT_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
        ],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_INIT_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_INIT_HELPURL
      }
    )
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_init'] = function (block) {
  Blockly.Python.definitions_['import_rover'] = 'from rover import *';
  Blockly.Python.definitions_['import_gamepad'] = 'from gamepad_handler import *';
  // TODO: Assemble Python into code variable.
  var code = "";
  return code;
};

Blockly.Blocks['gamepad_mode'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_mode",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_MODE_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "mode",
            options: [
              [
                Blockly.Msg.ROBOCON_GAMEPAD_MODE_DPAD,
                "MODE_DPAD"
              ],
              [
                Blockly.Msg.ROBOCON_GAMEPAD_MODE_LEFT_JOYSTICK,
                "MODE_LEFT_JOYSTICK"
              ],
              [
                Blockly.Msg.ROBOCON_GAMEPAD_MODE_RIGHT_JOYSTICK,
                "MODE_RIGHT_JOYSTICK"
              ],
              [
                Blockly.Msg.ROBOCON_GAMEPAD_MODE_BOTH_JOYSTICK,
                "MODE_BOTH_JOYSTICK"
              ],
            ],
          },],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_MODE_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_MODE_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_mode'] = function (block) {
  var mode = block.getFieldValue('mode');
  // TODO: Assemble Python into code variable.
  var code = 'gamepad_handler.set_drive_mode(' + mode + ')\n';
  return code;
};

Blockly.Blocks['gamepad_speed_btn'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_speed_btn",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_SPEED_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "btn1",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn2",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          }],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_SPEED_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_SPEED_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_speed_btn'] = function (block) {
  var btn1 = block.getFieldValue('btn1');
  var btn2 = block.getFieldValue('btn2');

  if (btn1 == 'square') btn1 = 'x';
  else if (btn1 == 'triangle') btn1 = 'y';
  else if (btn1 == 'cross') btn1 = 'a';
  else if (btn1 == 'circle') btn1 = 'b';
  if (btn2 == 'square') btn2 = 'x';
  else if (btn2 == 'triangle') btn2 = 'y';
  else if (btn2 == 'cross') btn2 = 'a';
  else if (btn2 == 'circle') btn2 = 'b';

  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_speed_btn('" + btn1 + "', '" + btn2 + "')\n";
  return code;
};

Blockly.Blocks['gamepad_set_servo'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_set_servo",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_SERVO_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "servo",
            options: [
              ["S1", "0"],
              ["S2", "1"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn1",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "input_value",
            name: "angle_min"
          },
          {
            type: "field_dropdown",
            name: "btn2",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "input_value",
            name: "angle_max"
          },
          {
            type: "input_value",
            name: "speed"
          }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_SERVO_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_SERVO_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_set_servo'] = function (block) {
  var servo = block.getFieldValue('servo');
  var btn1 = block.getFieldValue('btn1');
  var btn2 = block.getFieldValue('btn2');

  if (btn1 == 'square') btn1 = 'x';
  else if (btn1 == 'triangle') btn1 = 'y';
  else if (btn1 == 'cross') btn1 = 'a';
  else if (btn1 == 'circle') btn1 = 'b';
  if (btn2 == 'square') btn2 = 'x';
  else if (btn2 == 'triangle') btn2 = 'y';
  else if (btn2 == 'cross') btn2 = 'a';
  else if (btn2 == 'circle') btn2 = 'b';

  var angle_min = Blockly.Python.valueToCode(block, 'angle_min', Blockly.Python.ORDER_ATOMIC);
  var angle_max = Blockly.Python.valueToCode(block, 'angle_max', Blockly.Python.ORDER_ATOMIC);
  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_servo_btn(" + servo + ", '" + btn1 + "', '" + btn2 + "', " + angle_min + ", " + angle_max + ", " + speed + ")\n";
  return code;
};

Blockly.Blocks['gamepad_processing'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_processing",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
        ],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_HELPURL
      }
    )
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_processing'] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.process()\n";
  return code;
};

Blockly.Blocks['gamepad_set_led_rgb'] = {
  init: function () {
    this.jsonInit({
      "type": "gamepad_set_led_rgb",
      "message0": Blockly.Msg.ROBOCON_GAMEPAD_SET_LED_MESSAGE0,
      "args0": [
        {
          "type": "input_value",
          "name": "color"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": ColorBlock,
      "tooltip": Blockly.Msg.ROBOCON_GAMEPAD_SET_LED_TOOLTIP,
      "helpUrl": Blockly.Msg.ROBOCON_GAMEPAD_SET_LED_HELPURL
    }
    );
  }
};

Blockly.Python['gamepad_set_led_rgb'] = function (block) {
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'gamepad_handler.set_led_color(' + value_color + ')\n';
  return code;
};

Blockly.Blocks['gamepad_set_rumble'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "gamepad_set_rumble",
        "message0": Blockly.Msg.ROBOCON_GAMEPAD_SET_RUMBLE_MESSAGE0,
        "args0": [
          {
            min: 0,
            max: 100,
            type: "input_value",
            check: "Number",
            value: 50,
            name: "force",
          },
          {
            min: 0,
            max: 2000,
            type: "input_value",
            check: "Number",
            value: 1000,
            name: "duration",
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": ColorBlock,
        "tooltip": Blockly.Msg.ROBOCON_GAMEPAD_SET_RUMBLE_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_GAMEPAD_SET_RUMBLE_HELPURL
      }
    );
  }
};

Blockly.Python["gamepad_set_rumble"] = function (block) {
  var force = Blockly.Python.valueToCode(block, 'force', Blockly.Python.ORDER_ATOMIC);
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_rumble(" + force + ", " + duration + ")\n";
  return code;
};

Blockly.Blocks['gamepad_turbo_btn'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_turbo_btn",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_TURBO_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "btn",
            options: [
              ["R1", "r1"],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          }],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_TURBO_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_TURBO_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_turbo_btn'] = function (block) {
  var btn = block.getFieldValue('btn');

  if (btn == 'square') btn = 'x';
  else if (btn == 'triangle') btn = 'y';
  else if (btn == 'cross') btn = 'a';
  else if (btn == 'circle') btn = 'b';

  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_turbo_btn('" + btn + "')\n";
  return code;
};

Blockly.Blocks['gamepad_line_btn'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_line_btn",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_LINE_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "btn",
            options: [
              ["L1", "l1"],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "input_value",
            name: "speed"
          }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_LINE_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_LINE_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_line_btn'] = function (block) {
  var btn = block.getFieldValue('btn');

  if (btn == 'square') btn = 'x';
  else if (btn == 'triangle') btn = 'y';
  else if (btn == 'cross') btn = 'a';
  else if (btn == 'circle') btn = 'b';

  var speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_follow_line_btn(" + speed + ", '" + btn + "')\n";
  return code;
};

Blockly.Blocks['gamepad_set_gripper'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_set_gripper",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_GRIPPER_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "servo",
            options: [
              ["S1", "0"],
              ["S2", "1"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn1",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn2",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_GRIPPER_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_GRIPPER_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_set_gripper'] = function (block) {
  var servo = block.getFieldValue('servo');
  var btn1 = block.getFieldValue('btn1');
  var btn2 = block.getFieldValue('btn2');

  if (btn1 == 'square') btn1 = 'x';
  else if (btn1 == 'triangle') btn1 = 'y';
  else if (btn1 == 'cross') btn1 = 'a';
  else if (btn1 == 'circle') btn1 = 'b';
  if (btn2 == 'square') btn2 = 'x';
  else if (btn2 == 'triangle') btn2 = 'y';
  else if (btn2 == 'cross') btn2 = 'a';
  else if (btn2 == 'circle') btn2 = 'b';

  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_servo_btn(" + servo + ", '" + btn1 + "', '" + btn2 + "', 0, 90)\n";
  return code;
};

Blockly.Blocks['gamepad_set_ball_launcher'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_set_ball_launcher",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_BALL_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "servo1",
            options: [
              ["S1", "0"],
              ["S2", "1"],
            ],
          },
          {
            type: "field_dropdown",
            name: "servo2",
            options: [
              ["S2", "1"],
              ["S1", "0"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn1",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          },
          {
            type: "field_dropdown",
            name: "btn2",
            options: [
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["options", "m2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_BALL_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_BALL_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_set_ball_launcher'] = function (block) {
  var servo1 = block.getFieldValue('servo1');
  var servo2 = block.getFieldValue('servo2');
  var btn1 = block.getFieldValue('btn1');
  var btn2 = block.getFieldValue('btn2');

  if (btn1 == 'square') btn1 = 'x';
  else if (btn1 == 'triangle') btn1 = 'y';
  else if (btn1 == 'cross') btn1 = 'a';
  else if (btn1 == 'circle') btn1 = 'b';
  if (btn2 == 'square') btn2 = 'x';
  else if (btn2 == 'triangle') btn2 = 'y';
  else if (btn2 == 'cross') btn2 = 'a';
  else if (btn2 == 'circle') btn2 = 'b';

  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_ball_launcher_btn(" + servo1 + ", " + servo2 + ", '" + btn1 + "', '" + btn2 + "')\n";
  return code;
};

Blockly.Blocks['gamepad_change_mode_btn'] = {
  init: function () {
    this.jsonInit(
      {
        type: "gamepad_change_mode_btn",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_CHANGE_MODE_BTN_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
          {
            type: "field_dropdown",
            name: "btn",
            options: [
              ["options", "m2"],
              [
                {
                  "src": ImgUrl + 'ico-cross.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "cross"
              ],
              [
                {
                  "src": ImgUrl + 'ico-circle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "circle"
              ],
              [
                {
                  "src": ImgUrl + 'ico-square.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "square"
              ],
              [
                {
                  "src": ImgUrl + 'ico-triangle.png',
                  "width": 15,
                  "height": 15,
                  "alt": "*"
                },
                "triangle"
              ],
              ["A", "a"],
              ["B", "b"],
              ["X", "x"],
              ["Y", "y"],
              ["R1", "r1"],
              ["L1", "l1"],
              ["R2", "r2"],
              ["L2", "l2"],
              ["share", "m1"],
              ["left joystick", "thumbl"],
              ["right joystick", "thumbr"],
            ],
          }],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_CHANGE_MODE_BTN_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_CHANGE_MODE_BTN_HELPURL
      }
    );
  },
  getDeveloperVars: function () {
    return ['gamepad_handler'];
  }
};

Blockly.Python['gamepad_change_mode_btn'] = function (block) {
  var btn = block.getFieldValue('btn');

  if (btn == 'square') btn = 'x';
  else if (btn == 'triangle') btn = 'y';
  else if (btn == 'cross') btn = 'a';
  else if (btn == 'circle') btn = 'b';

  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.set_change_mode_btn('" + btn + "')\n";
  return code;
};

Blockly.Blocks['gamepad_is_connected'] = {
  init: function () {
    this.jsonInit(
      {
        "type": "gamepad_is_connected",
        "message0": Blockly.Msg.ROBOCON_GAMEPAD_IS_CONNECTED_MESSAGE0,
        "args0": [
        ],
        "colour": ColorBlock,
        "output": "Boolean",
        "tooltip": Blockly.Msg.ROBOCON_GAMEPAD_IS_CONNECTED_TOOLTIP,
        "helpUrl": Blockly.Msg.ROBOCON_GAMEPAD_IS_CONNECTED_HELPURL
      }
    );
  }
};

Blockly.Python["gamepad_is_connected"] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = "gamepad_handler.is_connected()";
  return [code, Blockly.Python.ORDER_NONE];
};

// REMOTE CONTROL BLOCK

Blockly.Blocks['remote_control_init'] = {
  init: function () {
    this.jsonInit(
      {
        type: "remote_control_init",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_START_REMOTE_CONTROL_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
        ],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_START_REMOTE_CONTROL_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_START_REMOTE_CONTROL_HELPURL
      }
    )
  },
  getDeveloperVars: function () {
    return ['rc_mode'];
  }
};

Blockly.Python['remote_control_init'] = function (block) {
  Blockly.Python.definitions_['import_remote_control'] = 'from remote_control import *';
  // TODO: Assemble Python into code variable.
  var code = "";
  return code;
};

Blockly.Blocks['remote_control_processing'] = {
  init: function () {
    this.jsonInit(
      {
        type: "remote_control_processing",
        message0: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_REMOTE_CONTROL_MESSAGE0,
        previousStatement: null,
        nextStatement: null,
        args0: [
        ],
        colour: ColorBlock,
        tooltip: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_REMOTE_CONTROL_TOOLTIP,
        helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_PROCESS_REMOTE_CONTROL_HELPURL
      }
    )
  },
  getDeveloperVars: function () {
    return ['rc_mode'];
  }
};

Blockly.Python['remote_control_processing'] = function (block) {
  Blockly.Python.definitions_['import_remote_control'] = 'from remote_control import *';
  // TODO: Assemble Python into code variable.
  var code = "rc_mode.run()\n";
  return code;
};

Blockly.Blocks["remote_control_on_button_pressed"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      message0: Blockly.Msg.ROBOCON_GAMEPAD_ON_BTN_MESSAGE0,
      tooltip: Blockly.Msg.ROBOCON_GAMEPAD_ON_BTN_TOOLTIP,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            ['A', 'BTN_A'],
            ['B', 'BTN_B'],
            ['C', 'BTN_C'],
            ['D', 'BTN_D'],
            [
              {
                "src": 'static/blocks/block_images/gamepad-square.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-circle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-cross.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-triangle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
            ["SHARE", "BTN_M1"],
            ["OPTIONS", "BTN_M2"],
            ["Left Joystick", "BTN_THUMBL"],
            ["Right Joystick", "BTN_THUMBR"],
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_FORWARD"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_BACKWARD"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
          ],
        },
        {
          type: "input_dummy",
        },
        {
          type: "input_statement",
          name: "ACTION",
        },
      ],
      helpUrl: Blockly.Msg.ROBOCON_GAMEPAD_ON_BTN_HELPURL,
    });
  },
  getDeveloperVars: function () {
    return ['rc_mode'];
  }
};

Blockly.Python['remote_control_on_button_pressed'] = function (block) {
  Blockly.Python.definitions_['import_remote_control'] = 'from remote_control import *';
  var button = block.getFieldValue('BUTTON');
  var statements_action = Blockly.Python.statementToCode(block, 'ACTION');

  var globals = buildGlobalString(block);

  var cbFunctionName = Blockly.Python.provideFunction_(
    'on_gamepad_button_' + button,
    (globals != '') ?
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals,
      statements_action || Blockly.Python.PASS
      ] :
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
      statements_action || Blockly.Python.PASS
      ]);

  var code = 'rc_mode.set_command(' + button + ', ' + cbFunctionName + ')\n';
  Blockly.Python.definitions_['on_gamepad_button_callback' + button] = code;

  return '';
};

Blockly.Blocks["remote_control_read_button"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: Blockly.Msg.ROBOCON_GAMEPAD_READ_BTN_TOOLTIP,
      message0: Blockly.Msg.ROBOCON_GAMEPAD_READ_BTN_MESSAGE0,
      args0: [
        {
          type: "field_dropdown",
          name: "BUTTON",
          options: [
            [
              {
                "src": 'static/blocks/block_images/gamepad-square.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_SQUARE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-circle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CIRCLE"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-cross.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_CROSS"
            ],
            [
              {
                "src": 'static/blocks/block_images/gamepad-triangle.png',
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_TRIANGLE"
            ],
            ["L1", "BTN_L1"],
            ["R1", "BTN_R1"],
            ["L2", "BTN_L2"],
            ["R2", "BTN_R2"],
            ["A", "BTN_A"],
            ["B", "BTN_B"],
            ["C", "BTN_C"],
            ["D", "BTN_D"],
            [
              {
                "src": "static/blocks/block_images/59043.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_UP"
            ],
            [
              {
                "src": "static/blocks/block_images/959159.svg",
                "width": 15,
                "height": 15,
                "alt": "*"
              },
              "BTN_DOWN"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-left.svg",
                "width": 15,
                "height": 15,
                "alt": "side left"
              },
              "BTN_LEFT"
            ],
            [
              {
                "src": "static/blocks/block_images/arrow-right.svg",
                "width": 15,
                "height": 15,
                "alt": "side right"
              },
              "BTN_RIGHT"
            ],
          ],
        }
      ],
      output: "Boolean",
      helpUrl: "",
    });
  },
  getDeveloperVars: function () {
    return ['rc_mode'];
  }
};

Blockly.Python["remote_control_read_button"] = function (block) {
  var button = block.getFieldValue("BUTTON");
  // TODO: Assemble Python into code variable.
  var code = 'rc_mode.read_gamepad("' + button + '") == 1';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks["remote_control_read_joystick"] = {
  init: function () {
    this.jsonInit({
      colour: ColorBlock,
      tooltip: "",
      message0: Blockly.Msg.ROBOCON_GAMEPAD_READ_JOYSTICK_MESSAGE0,
      args0: [
        {
          "type": "field_dropdown",
          "name": "joystick",
          "options": [
            [
              Blockly.Msg.ROBOCON_GAMEPAD_READ_JOYSTICK_LEFT,
              "al"
            ],
            [
              Blockly.Msg.ROBOCON_GAMEPAD_READ_JOYSTICK_RIGHT,
              "ar"
            ]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "data",
          "options": [
            [
              "X",
              "x"
            ],
            [
              "Y",
              "y"
            ]
          ]
        }
      ],
      output: "Number",
      helpUrl: "",
    });
  },
};

Blockly.Python["remote_control_read_joystick"] = function (block) {
  var joystick = block.getFieldValue("joystick");
  var data = block.getFieldValue("data");
  // TODO: Assemble Python into code variable.
  var code = 'rc_mode.read_gamepad("' + joystick + data + '")';
  return [code, Blockly.Python.ORDER_NONE];
};