// Functie om de divider te initialiseren en het verslepen mogelijk te maken
function initDivider() {
    const divider = document.getElementById('divider');
    const leftPanel = document.getElementById('boilerContainer');
    const rightPanel = document.getElementById('blocklyDiv');
    let startX, startWidth;

    divider.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        startWidth = leftPanel.offsetWidth;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    });

    function onDrag(e) {
        const newWidth = startWidth + e.clientX - startX;
        leftPanel.style.width = newWidth + 'px';
        rightPanel.style.width = `calc(100% - ${newWidth}px)`;
    }

    function stopDrag() {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

// Functie om berichten naar de terminal te loggen
function logToTerminal(message) {
    var currentTime = new Date().toLocaleTimeString();
    var terminal = document.getElementById('terminal');
    terminal.value += `[${currentTime}] ${message}\n`;
    terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
}


// Functie om de sensorwaarde bij te werken
const reversedValueMap = {
    10: -10,
    92: 21,
    93: 21.4,
    94: 21.9,
    95: 22.8,
    96: 23.2,
    97: 23.6,
    98: 24.5,
    99: 25.3,
    100: 26,
    101: 26.1,
    102: 27,
    103: 28,
    104: 29,
    105: 30,
    106: 30.9,
    107: 32,
    108: 33.4,
    109: 34.2,
    110: 35.5,
    111: 37,
    112: 39,
    113: 40,
    114: 41.7,
    115: 43.5,
    116: 46.4,
    117: 48,
    118: 50,
    119: 52.3,
    120: 56.8,
    121: 59.8,
    122: 63.3,
    123: 67.8,
    124: 75.3,
    125: 82.1,
    126: 92,
    127: 108,
    128: 144
};
function updateSensorValue(sensor, value) {
    const sensorValue = reversedValueMap[value];
    
    if (sensorValue !== undefined) {
        var sensorElement = document.getElementById('sensor' + sensor);
        var tempElement = sensorElement.querySelector('.temp');
        tempElement.textContent = `Sensor ${sensor}: ${sensorValue}°C`;
        logToTerminal(`Sensor ${sensor} set to ${sensorValue}°C`);
    } else {
        console.error(`Geen overeenkomende sensorwaarde gevonden voor ingevoerde waarde ${value}.`);
    }
}



// Initialiseer de divider en Blockly wanneer de pagina geladen is
window.onload = function() {
    initDivider();

    // Initialiseer Blockly workspace en maak het beschikbaar in een bredere scope
    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: document.getElementById('toolbox')
    });

    // Voeg functie toe om Blockly code uit te voeren wanneer de 'Start Script' knop wordt geklikt
    var runButton = document.getElementById('runButton');
    runButton.onclick = executeCode(workspace);
};

// Functie om Blockly code uit te voeren
function executeCode(workspace) {
    return async function() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        try {
            // Omsluit de gegenereerde code in een async functie voordat je deze evalueert
            await eval('(async () => {' + code + '})()');
            logToTerminal('Code volledig afgerond.');
        } catch (e) {
            logToTerminal('Error: ' + e.toString());
        }
    }
}

document.getElementById('saveButton').addEventListener('click', saveWorkspace);
document.getElementById('loadButton').addEventListener('click', loadWorkspace);

function saveWorkspace() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('blocklyWorkspace', xmlText); // Opslaan in lokale opslag
}

function loadWorkspace() {
    var fileInput = document.getElementById('fileInput');
    fileInput.click(); // Open het bestandsinvoervenster

    fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var text = e.target.result;
                var xml = Blockly.Xml.textToDom(text);
                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
            };
            reader.readAsText(file);
        }
    }, false);
}

function saveWorkspace() {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xml);
    var blob = new Blob([xmlText], {type: 'text/xml'});

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'blocklyWorkspace.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

