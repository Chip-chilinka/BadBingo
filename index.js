function GetRandomNumber(min, max) {
	min = Math.ceil(min)
    max = Math.floor(max)
    let number = (Math.random() * (max + 1 - min)) + min
    return Math.floor(number)
}

function randUniqueArr(count, min, max) {
	let arr = [];
	while (arr.length !== count) {
		let rand = GetRandomNumber(min, max); // FIXME modify GetRandomNumber  DONE
		if (arr.indexOf(rand) == -1) arr.push(rand);
	}
	return arr;
}

let MainCircleArray = randUniqueArr(90, 1, 90);

// let MappedCircleArray = MainCircleArray.map(function(i){
// 	return `<div>${i}</div>`;
// })

// FIXME make interval instead of setTimeout for each value    DONE
//setInterval(() => {
//	// get element
//	// draw it
//}, N)

let CirclesArray = [0, 0, 0, 0, 0];
let counter = 0
const TimerSet = setInterval(function(){
	CirclesArray.unshift(MainCircleArray[counter]);
	CirclesArray.splice(5, 1);
	document.getElementById("MainCircle").innerHTML = (CirclesArray[0])
	document.getElementById("Circle2").innerHTML = (CirclesArray[1])
	document.getElementById("Circle3").innerHTML = (CirclesArray[2])
	document.getElementById("Circle4").innerHTML = (CirclesArray[3])
	document.getElementById("Circle5").innerHTML = (CirclesArray[4])
	console.log(CirclesArray)
	
	counter++ 
	
	if (counter === 90){
		clearInterval(TimerSet);
	}
}, 3000)


//Создание и отрисовка строк
const renderRow = (rows, table) => {
	for (let i = 0; i < rows; i++) {
		let tr = document.createElement('tr')
		table.appendChild(tr)
	}
}
// Создание и отрисовка ячеек
const renderCell = (cells, table) => {
	const rows = table.querySelectorAll('tr')
	rows.forEach((element) => {
		// Переменная чекер, которая позволит выйти из цикла, когда отобразим достаточное кол-во ячеек
		// while (enoughCells < cells) { //        FIXME make for					DONE
		// 	let td = document.createElement('td')
		// 	element.appendChild(td)
		// 	enoughCells++
		// }
		for (let enoughCells = 0; enoughCells < cells; enoughCells++){
			let td = document.createElement('td')
			element.appendChild(td)
		}
	})
}
const renderRandomCount = (table) => {
	const rows = table.querySelectorAll('tr')
	// проходимся по каждой строке
	rows.forEach((element) => {
		// Получаем все ячейки этой строки
		const cells = element.querySelectorAll('td')
		// Создаем set из 5 уникальных цифр (каждая строка должна содержать 5 рандомных заполненных ячеек)
		const randomPos = new Set()
		while (randomPos.size !== 5) {
			randomPos.add(GetRandomNumber(0, 9))
		}
		// Проходимся по каждой ячейке одной строки
		cells.forEach((element, indexCell) => {
			// Если рандомная позиция совпадает с текущей ячейкой, то тогда вписываем в него число
			randomPos.has(indexCell)
			? (element.textContent = setRandomCount(indexCell, 9))
			: null
		})
	})
}
const setRandomCount = (cellPos, totalCells) => {
	let randomCount
	// Подготовка структуры данных для позиции ячейки с ее определенным рейнджем для генерации
	let hashMapCells = {
		0: [1, 9],
	}
	// Минимальное и максимальное значение на для второй ячейки
	let min = 10
	let max = 19
	// Заполняем структуру данных для позиции ячейки с ее определенным рейнджем для генерации
	for (let i = 1; i < totalCells; i++) {
		hashMapCells[i] = [min, max]
		min = min + 10
		max = max + 10
		if (max == 90){
			max += 1
		} // TODO support 90 in last colum             DONE
	}
	// Проходимся по ключам в нашей структуре данных
	for (key in hashMapCells) {
		// Если текущие значение совпадает с текущими ключами в структуре, то записываем в ячейку число с соответствующим ей рейнджем
		if (key == cellPos) {
			randomCount = GetRandomNumber(...hashMapCells[cellPos]) // GetRandomNumber(hashMapCells[cellPos][0], hashMapCells[cellPos][1]); a, b = [0, 1]
			//if (cer)
		}
	}
	return randomCount
}

// Главная функция, которая рендерит всю таблицу
const renderTable = (curTable) => { // FIXME move after functions used   DONE
	const table = document.getElementById(curTable)
	renderRow(3, table)
	renderCell(9, table)
	renderRandomCount(table)
}

renderTable('table1')
renderTable('table2')
renderTable('table3')
