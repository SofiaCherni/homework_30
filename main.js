const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];

const usersContainer = document.querySelector('.users');

class User {
    constructor({name, age, role, img, courses = []}) {
        this.name = name;
        this.age = age;
        this.role = role;
        this.img = img;
        this.courses = courses;
    }

	render() {
        const containerUser = document.createElement('div');
        containerUser.classList.add('user');

        containerUser.innerHTML = `
            <div class="user__info">
                <div class="user__info--data">
                    <img src="images/users/${this.img}.png" alt="${this.name}" height="50">
                    <div class="user__naming">
                        <p>Name: <b>${this.name}</b></p>
                        <p>Age: <b>${this.age}</b></p>
                    </div>
                </div>
                <div class="user__info--role ${this.role}">
                    <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>
        `;

        this.renderCourses(containerUser);
        usersContainer.appendChild(containerUser);
    }


	renderCourses(containerUser) {
        if (this.courses.length) {
            const coursesContainer = document.createElement('div');
            coursesContainer.classList.add('user__courses');

            this.courses.forEach(course => {
                const courseElement = document.createElement('p');
                const grade = this.getCourseGrade(gradation, course.mark || course.score);
                courseElement.classList.add('user__courses--course', this.role);
                courseElement.innerHTML = `${course.title} <span class="${grade}">${grade}</span>`;
                coursesContainer.appendChild(courseElement);
            });

            containerUser.appendChild(coursesContainer);
        }
    }

    getCourseGrade(gradation, mark) {
        for (let key in gradation) {
            if (mark <= key) {
                return gradation[key];
            }
        }
        return 'нет значения';
    }
}

class Student extends User {
    constructor({name, age, role, img, courses = []}) {
        super({name, age, role, img, courses})
    }
}

class Admin extends User {
    constructor({name, age, role, img, courses = []}) {
        super({name, age, role, img, courses})
    }

    renderCourses(containerUser) {
        if (this.courses.length) {
            const coursesContainer = document.createElement('div');
            coursesContainer.classList.add('user__courses', 'admin--info');

            this.courses.forEach(course => {
                const courseElement = document.createElement('p');
                const grade = this.getCourseGrade(gradation, course.score);
                courseElement.classList.add('user__courses--course', 'admin');
                courseElement.innerHTML = `
                <p>Title: <b>${course.title}</b></p>
                <p>Admin's score: <span class="${grade}">${grade}</span></p>
                <p>Lector: <b>${course.lector}</b></p>
                `;
                coursesContainer.appendChild(courseElement);
            });

            containerUser.appendChild(coursesContainer);
        }
    }
}

class Lector extends User {
    constructor({name, age, role, img, courses = []}) {
        super({name, age, role, img, courses})
    }
    
    renderCourses(containerUser) {
        if (this.courses.length) {
            const coursesContainer = document.createElement('div');
            coursesContainer.classList.add('user__courses', 'admin--info');

            this.courses.forEach(course => {
                const courseElement = document.createElement('p');
                const grade = this.getCourseGrade(gradation, course.score);
                const studentsGrade = this.getCourseGrade(course.studentsScore);
                courseElement.classList.add('user__courses--course', 'lector');
                courseElement.innerHTML = `
                <p>Title: <b>${course.title}</b></p>
                <p>Lector's score: <span class="${grade}">${grade}</span></p>
                <p>Average student's score: <span class="${studentsGrade}">${studentsGrade}</span></p>
                `;
                coursesContainer.appendChild(courseElement);
            });

            containerUser.appendChild(coursesContainer);
        }
    }
}

users.forEach(user => {
    let person;
    if (user.role === 'student') {
        person = new Student(user);
    } else if (user.role === 'admin') {
        person = new Admin(user);
    } else if (user.role === 'lector') {
        person = new Lector(user);
    } else {
        person = new User(user);
    }
    person.render();
});
