const monthYearEl = document.getElementById("monthYear");
const calendarDaysEl = document.getElementById("calendarDays");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

// Intersection Observer for individual day cells
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            entry.target.style.transition = `opacity 0.4s ease ${index * 0.02}s, transform 0.4s ease ${index * 0.02}s`;
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = "translateY(10px)";
        }
    });
}, { threshold: 0.1 });

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYearEl.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDaysEl.innerHTML = "";

    // Empty cells
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDaysEl.appendChild(emptyCell);
    }

    const scheduledDays = Array.from({ length: 8 }, () => Math.floor(Math.random() * daysInMonth) + 1);

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("div");
        cell.className = "relative h-32 border rounded hover:bg-gray-50 cursor-pointer opacity-0 transform translate-y-2";
        cell.dataset.index = day; // for stagger delay

        // Day number
        const dayNum = document.createElement("div");
        dayNum.textContent = day;
        dayNum.className = "absolute top-1 right-1 text-gray-700 font-semibold";
        cell.appendChild(dayNum);

        // Dots
        if (scheduledDays.includes(day)) {
            const dotContainer = document.createElement("div");
            dotContainer.className = "absolute bottom-1 left-1 flex space-x-1";
            const colors = ["bg-blue-500", "bg-green-500", "bg-violet-500"];
            const dotCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement("span");
                dot.className = `w-3 h-3 ${colors[Math.floor(Math.random() * colors.length)]} rounded-full`;
                dotContainer.appendChild(dot);
            }
            cell.appendChild(dotContainer);
        }

        calendarDaysEl.appendChild(cell);

        // Observe each day
        observer.observe(cell);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

generateCalendar(currentDate);