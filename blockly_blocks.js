

// Eerst definiëren we de Blockly blokken
Blockly.defineBlocksWithJsonArray([
    // ...
    {
      "type": "set_sensor_value",
      "message0": "set sensor %1 value to %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SENSOR",
          "options": [
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            ["-10", "10"],
            ["21", "92"],
            ["21.4", "93"],
            ["21.9", "94"],
            ["22.8", "95"],
            ["23.2", "96"],
            ["23.6", "97"],
            ["24.5", "98"],
            ["25.3", "99"],
            ["26", "100"],
            ["26.1", "101"],
            ["27", "102"],
            ["28", "103"],
            ["29", "104"],
            ["30", "105"],
            ["30.9", "106"],
            ["32", "107"],
            ["33.4", "108"],
            ["34.2", "109"],
            ["35.5", "110"],
            ["37", "111"],
            ["39", "112"],
            ["40", "113"],
            ["41.7", "114"],
            ["43.5", "115"],
            ["46.4", "116"],
            ["48", "117"],
            ["50", "118"],
            ["52.3", "119"],
            ["56.8", "120"],
            ["59.8", "121"],
            ["63.3", "122"],
            ["67.8", "123"],
            ["75.3", "124"],
            ["82.1", "125"],
            ["92", "126"],
            ["108", "127"],
            ["144", "128"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "Set the value of a sensor",
      "helpUrl": ""
    }
    // ...
  ]);

// Blijf je bestaande blokdefinities behouden
// ...
Blockly.Blocks['set_all_sensors_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set all sensors value to")
        .appendField(new Blockly.FieldDropdown([
          ["-10", "10"],
          ["21", "92"],
          ["21.4", "93"],
          ["21.9", "94"],
          ["22.8", "95"],
          ["23.2", "96"],
          ["23.6", "97"],
          ["24.5", "98"],
          ["25.3", "99"],
          ["26", "100"],
          ["26.1", "101"],
          ["27", "102"],
          ["28", "103"],
          ["29", "104"],
          ["30", "105"],
          ["30.9", "106"],
          ["32", "107"],
          ["33.4", "108"],
          ["34.2", "109"],
          ["35.5", "110"],
          ["37", "111"],
          ["39", "112"],
          ["40", "113"],
          ["41.7", "114"],
          ["43.5", "115"],
          ["46.4", "116"],
          ["48", "117"],
          ["50", "118"],
          ["52.3", "119"],
          ["56.8", "120"],
          ["59.8", "121"],
          ["63.3", "122"],
          ["67.8", "123"],
          ["75.3", "124"],
          ["82.1", "125"],
          ["92", "126"],
          ["108", "127"],
          ["144", "128"]
            // ... voeg hier andere opties toe
        ]), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set the value of all sensors");
    this.setHelpUrl("");
  }
};

// Delay blok
Blockly.defineBlocksWithJsonArray([
    // ...
    {
      "type": "delay",
      "message0": "wait %1 seconds",
      "args0": [
        {
          "type": "field_number",
          "name": "SECONDS",
          "value": 1,
          "min": 0.1,
          "precision": 0.1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120
    },
    // Loop blok
    {
      "type": "loop",
      "message0": "loop",
      "nextStatement": null,
      "colour": 160
    },
    // Stop blok
    {
      "type": "stop",
      "message0": "stop script",
      "previousStatement": null,
      "colour": 210
    },

    {
        "type": "while_timer",
        "message0": "while timer is less than %1 seconds",
        "args0": [
            {
                "type": "field_number",
                "name": "DURATION",
                "value": 5,
                "min": 0.1,
                "precision": 0.1
            }
        ],
        "message1": "do %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
    },
    {
        "type": "timer_with_condition",
        "message0": "run for %1 seconds with condition %2",
        "args0": [
          {
            "type": "field_number",
            "name": "DURATION",
            "value": 5,
            "min": 0.1,
            "precision": 0.1
          },
          {
            "type": "input_value",
            "name": "CONDITION"
          }
        ],
        "message1": "do %1",
        "args1": [
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
      },
      {
        "type": "repeat_for",
        "message0": "repeat %1 times",
        "args0": [
          {
            "type": "field_number",
            "name": "TIMES",
            "value": 5,
            "min": 1
          }
        ],
        "message1": "do %1",
        "args1": [
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160
      },

      {
        "type": "log_to_terminal",
        "message0": "log to terminal %1",
        "args0": [
            {
                "type": "field_input",
                "name": "MESSAGE",
                "text": "" // Standaardtekst kan hier worden ingesteld of leeggelaten worden
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160,
        "tooltip": "Logs a message to the terminal",
        "helpUrl": ""
    },
    {
      "type": "if_else_custom",
      "message0": "if %1",
      "args0": [
          {
              "type": "input_value",
              "name": "CONDITION",
              "check": "Boolean"
          }
      ],
      "message1": "then %1",
      "args1": [
          {
              "type": "input_statement",
              "name": "DO_IF_TRUE"
          }
      ],
      "message2": "else %1",
      "args2": [
          {
              "type": "input_statement",
              "name": "DO_IF_FALSE"
          }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 210,
      "tooltip": "If the condition is true, do the first block of statements; otherwise, do the second block",
      "helpUrl": ""
  },

  {
    "type": "get_boiler_status",
    "message0": "is boiler on",
    "output": "Boolean",  // Geeft aan dat dit blok een booleaanse waarde retourneert
    "colour": 210,
    "tooltip": "Returns true if the boiler is on, false if it is off",
    "helpUrl": ""
  }
    // ...
  ]);

  
  
  // Delay code generator
  Blockly.JavaScript['delay'] = function(block) {
    var seconds = block.getFieldValue('SECONDS');
    var code = `await new Promise(resolve => setTimeout(resolve, ${seconds} * 1000));\n`;
    return code;
  };
  
  Blockly.JavaScript['while_timer'] = function(block) {
    var duration = Blockly.JavaScript.valueToCode(block, 'DURATION', Blockly.JavaScript.ORDER_ATOMIC);
    var loopCode = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = `
    var startTime = new Date().getTime();
    var endTime = startTime + (${duration} * 1000); // Convert seconds to milliseconds
    
    while (new Date().getTime() < endTime) {
        ${loopCode}
    }
    `;

    return code;
};

  
  // Stop code generator
  Blockly.JavaScript['stop'] = function(block) {
    // In dit geval gooien we een fout die we kunnen opvangen om de uitvoering te stoppen
    var code = 'throw new Error("Script stopped by user.");\n';
    return code;
  };
  
  
  // Vervolgens de JavaScript-codegenerator voor de blokken
  Blockly.JavaScript['set_sensor_value'] = function(block) {
    var sensor = block.getFieldValue('SENSOR');
    var value = block.getFieldValue('VALUE');
    // De updateSensorValue functie moet bestaan in de script.js file
    var code = `updateSensorValue(${sensor}, ${value});\n`;
    code += `sendSerialCommand("ntc${sensor}:${value}\\n");\n`;
    return code;
  };



Blockly.JavaScript['repeat_for'] = function(block) {
    var times = Number(block.getFieldValue('TIMES'));
    var loopCode = Blockly.JavaScript.statementToCode(block, 'DO');

    var code = `
    for (var i = 0; i < ${times}; i++) {
        ${loopCode}
    }
    `;

    return code;
};

Blockly.JavaScript['set_all_sensors_value'] = function(block) {
  var value = block.getFieldValue('VALUE');
  var code = '';

  for (var sensor = 1; sensor <= 6; sensor++) {
      code += `updateSensorValue(${sensor}, ${value});\n`;
      code += `sendSerialCommand("ntc${sensor}:${value}\\n");\n`;
  }

  return code;
};



Blockly.JavaScript['log_to_terminal'] = function(block) {
  var message = Blockly.JavaScript.quote_(block.getFieldValue('MESSAGE'));
  var code = `logToTerminal(${message});\n`;
  return code;
};

Blockly.JavaScript['if_else_custom'] = function(block) {
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_ATOMIC) || 'false';
  var doIfTrue = Blockly.JavaScript.statementToCode(block, 'DO_IF_TRUE');
  var doIfFalse = Blockly.JavaScript.statementToCode(block, 'DO_IF_FALSE');
  var code = `if (${condition}) {\n${doIfTrue}} else {\n${doIfFalse}}\n`;
  return code;
};

Blockly.JavaScript['get_boiler_status'] = function(block) {
  var code = 'boilerStatus';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
