let activePort = null;
let boilerStatus = false; // Houdt de status van de boiler bij

async function connectSerial() {
    if (activePort) {
        console.log("Al verbonden met een apparaat.");
        updateButtonLabel("Verbonden");
        return;
    }

    try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        activePort = port;
        console.log("Verbonden met de seriële poort.");
        updateButtonLabel("Verbonden");

        const reader = port.readable.getReader();
        readLoop(reader); // Start de leeslus na succesvolle verbinding
    } catch (error) {
        console.error('Fout bij het verbinden met de seriële poort:', error);
        updateButtonLabel("Verbind met Arduino");
    }
}

function updateButtonLabel(label) {
    const button = document.getElementById('connectArduinoButton');
    button.textContent = label;
}

async function readLoop(reader) {
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            console.log("Seriële leeslus beëindigd.");
            reader.releaseLock();
            break;
        }
        if (value) {
            const text = new TextDecoder().decode(value);
            //console.log('Seriële data ontvangen:', text);
            checkBoilerStatus(text); // Update de status van de boiler
        }
    }
}

function checkBoilerStatus(text) {
    if (text.includes("aan")) {
        boilerStatus = true;
        console.log("Boiler staat aan.");
    } else if (text.includes("uit")) {
        boilerStatus = false;
        console.log("Boiler staat uit.");
    }
}

let writer = null;

async function sendSerialCommand(command) {
    if (activePort && activePort.writable) {
        if (!writer) {
            writer = activePort.writable.getWriter();
        }
        await writer.write(new TextEncoder().encode(command));
    } else {
        console.error("Geen actieve verbinding met de Arduino.");
        if (writer) {
            writer.releaseLock();
            writer = null;
        }
    }
}

document.getElementById('connectArduinoButton').addEventListener('click', connectSerial);
