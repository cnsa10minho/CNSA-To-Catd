const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const modal = document.getElementById('modal');
const taskInput = document.getElementById('taskInput');
const saveTask = document.getElementById('saveTask');
const closeModal = document.getElementById('closeModal');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;
let tasks = {};

// 캘린더 렌더링 함수
function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    calendar.innerHTML = '';

    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        calendar.appendChild(emptyDiv);
    }

    // 날짜 칸 생성
    for (let i = 1; i <= daysInMonth; i++) {
        const dateDiv = document.createElement('div');
        dateDiv.textContent = i;
        dateDiv.className = 'date';

        // 할 일이 있으면 스타일 변경
        const taskForDate = tasks[`${currentYear}-${currentMonth + 1}-${i}`];
        if (taskForDate) {
            dateDiv.classList.add('has-task');
        }

        dateDiv.addEventListener('click', () => openModal(i));  // 날짜 클릭 시 모달 열기
        calendar.appendChild(dateDiv);
    }
}

// 모달 열기 함수
function openModal(date) {
    selectedDate = date;
    modal.style.display = 'block';  // 모달 보이기
    const taskForDate = tasks[`${currentYear}-${currentMonth + 1}-${date}`];
    if (taskForDate) {
        taskInput.value = taskForDate;  // 저장된 할 일이 있으면 해당 내용 불러오기
    } else {
        taskInput.value = '';  // 없으면 빈 칸
    }
}

// 모달 닫기 함수
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';  // 모달 닫기
});

// 할 일 저장 함수
saveTask.addEventListener('click', () => {
    const task = taskInput.value;
    if (task) {
        tasks[`${currentYear}-${currentMonth + 1}-${selectedDate}`] = task;
        alert('할 일이 저장되었습니다.');
    } else {
        alert('할 일을 입력하세요.');
    }
    modal.style.display = 'none';  // 모달 닫기
    renderCalendar();  // 캘린더 다시 그리기
});

// 이전 달로 이동
prev.addEventListener('click', () => {
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
    renderCalendar();
});

// 다음 달로 이동
next.addEventListener('click', () => {
    currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
    currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
    renderCalendar();
});

renderCalendar();  // 초기 캘린더 렌더링
