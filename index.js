let button = document.querySelector('#button')
let sidebar = document.querySelector('.sidebar')

button.onclick = function () {
	sidebar.classList.toggle('active')
}


function GetRandomNumber(min, max) {
	min = Math.ceil(min)
    max = Math.floor(max)
    let number = (Math.random() * (max + 1 - min)) + min
    return Math.floor(number)
}

// function randUniqueArr(count, min, max) {    // C Set все нахуя не работает
// 	let arr = new Set();
// 	while (arr.length !== count) {
// 		let rand = GetRandomNumber(min, max);
// 		arr.add(rand)
// 	}
// 	return arr;
// }

function randUniqueArr(count, min, max) {
	let arr = []; // can be set
	while (arr.length !== count) { 
		let rand = GetRandomNumber(min, max);
		if (arr.indexOf(rand) == -1) arr.push(rand); //уберет if
	}
	return arr;
}

let mainCircleArray = randUniqueArr(90, 1, 90);

let circlesArray = [0, 0, 0, 0, 0];
const TimerSet = setInterval(function(){
	circlesArray.unshift(mainCircleArray.pop());
	circlesArray.pop();
	document.querySelectorAll(".circle").forEach((element, i) => {
		element.innerHTML = circlesArray[i]
	})
	
	if (!mainCircleArray.length){
		clearInterval(TimerSet);
	}
}, 5000)


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
		for (let enoughCells = 0; enoughCells < cells; enoughCells++){
			let td = document.createElement('td')
			element.appendChild(td)
		}
	})
}

const renderRandomCount = (table) => 
	table.querySelectorAll('tr').forEach((element) => {
		const cells = element.querySelectorAll('td')
		const randomPos = new Set()
		while (randomPos.size !== 5) {
			randomPos.add(GetRandomNumber(0, 9))
		}
		
		cells.forEach((element, indexCell) => {
			// Если рандомная позиция совпадает с текущей ячейкой, то тогда вписываем в него число
			if (randomPos.has(indexCell)) {
				if (indexCell === 0) return element.textContent = GetRandomNumber(1, 9);
				element.textContent = GetRandomNumber(indexCell * 10, indexCell * 10 + (indexCell === 8 ? 10 : 9))
			}
		})
	})


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
		}
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
const renderTable = (curTable) => {
	const table = document.getElementById(curTable)
	renderRow(3, table)
	renderCell(9, table)
	renderRandomCount(table)
}

renderTable('table1')
renderTable('table2')
renderTable('table3')


// var sum = "";
// document.querySelectorAll("#table tr").forEach(tr => {
//   var cells = [];
//   tr.querySelectorAll("td").forEach(td => cells.push(td.textContent));
//   sum += "row=" + cells.join("&");
// });

// console.log(sum);

// document.querySelectorAll("td").forEach(td => {
// 	if (td.innerText === ""){
// 		td.onclick = console.log("Дебил, ячейка пустая")
// 	} else if (circlesArray.includes(td.innerText)){
// 		td.onclick = console.log(td.innerText, "присутствует")
// 	}
// });

//e.target

// function clickFunction(event){
// 	console.log(event.innerText)
// 	// if (event.innerText === ""){
// 		// 	alert("пустая")
// 		// }
// 		// } else if (circlesArray.includes(td.innerText)){
// 			// 	td.onclick = console.log(td.innerText, "присутствует")
// 			// }
// 		}
		
// const td = document.querySelectorAll('td');
// td.addEventListener('click', clickFunction)

document.querySelectorAll('td').forEach((element) => 
	element.addEventListener('click', () => {
		if (!element.innerHTML.length) {
			element.style.backgroundColor = "#ff0000";
			return alert("Ячейка пустая")
		}
		
		if (circlesArray.includes(Number(element.innerHTML))) {
			element.style.backgroundColor = "#7FFF00";
			return alert("Попал")
		}

		element.style.backgroundColor = "#FFD700";
		alert("Этого числа нет в списке")
	})
)


