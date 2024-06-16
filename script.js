document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn1').addEventListener('click', () => handleClick(document.getElementById('btn1')));
    document.getElementById('btn5').addEventListener('click', () => handleClick(document.getElementById('btn5')));
    document.getElementById('btn6').addEventListener('click', () => handleClick(document.getElementById('btn6')));
    document.getElementById('btn7').addEventListener('click', () => handleClick(document.getElementById('btn7')));
    document.getElementById('btn9').addEventListener('click', () => handleClick(document.getElementById('btn9')));
    document.getElementById('btn10').addEventListener('click', () => handleClick(document.getElementById('btn10')));
    document.getElementById('deleteBtn').addEventListener('click', () => deleteClick());
    document.getElementById('startBtn').addEventListener('click', () => startProg());
});

var clickedor = 0


const handleClick = (button) => {
    if(clickedor == 0) {
        button.classList.add('clicked');
        numGp = "GP" + button.id.replace("btn", "")
        copyFile(numGp)
        clickedor = 1
    } else {
        return
    }
}

const deleteClick = () => {
    btn1.classList.remove('clicked')
    btn5.classList.remove('clicked')
    btn6.classList.remove('clicked')
    btn7.classList.remove('clicked')
    btn9.classList.remove('clicked')
    btn10.classList.remove('clicked')
    clickedor = 0
    deleteFile()
}

const startProg = () => {
    //const programPath = 'C:\\Windows\\System32\\notepad.exe';  // Замените на путь к вашей программе
    const programPath = 'C:\\Program Files\\MDO\\ParsecNET 3\\MDO.Parsec.Win.exe';
    window.electronAPI.runProgram(programPath);
}

const copyFile = (numGp) => {
    const source = `GP\\${numGp}\\parsec.ini`;  // Замените на путь к исходному файлу
    //const destination = 'D:\\Development\\SKYD_utility\\end\\parsec.ini';  // Замените на путь к папке назначения
    const destination = 'C:\\ProgramData\\MDO\\ParsecNET 3\\parsec.ini';
    window.electronAPI.copyFile(source, destination);
}

const deleteFile = () => {
    //const filePath = 'D:\\Development\\SKYD_utility\\end\\parsec.ini';  // Замените на путь к файлу, который нужно удалить
    const filePath = 'C:\\ProgramData\\MDO\\ParsecNET 3\\parsec.ini';
    window.electronAPI.deleteFile(filePath);
};