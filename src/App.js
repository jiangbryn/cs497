import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Title } from 'rbx';


const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

//JS Function
const getCourseTerm = course => (
	terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
	course.id.slice(1, 4)
)


//User's Components
function Banner(props) {
	return <Title>{ props.title || '[loading...]'}</Title>;
}

function Course(props) {
	return (
		<Button>
			{ getCourseTerm(props.course) } CS { getCourseNumber(props.course) }: { props.course.title }
		</Button>
	);
}

function CourseList(props) {
	return (
		<Button.Group>
			{ props.courses.map((course) => 
				<Course key={course.id} course={ course } />
			)}
		</Button.Group>
	);
}
/*
const Banner = ({ title }) => (
	<h1>{ title }</h1>
);
  
const Course = ({ course }) => (
	<button>{ getCourseTerm(course) } CS { getCourseNumber(course) }: { course.title }</button>
);

const CourseList = ({ courses }) => (
	<div>
		{courses.map(course => <Course key={course.id} course={ course } />)}
	</div>
);
*/

//App
const App = () =>  {
	const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';	
	const [schedule, setSchedule] = useState({ title: '', courses: [] });
	useEffect(() => {
		const fetchSchedule = async () => {
			const response = await fetch(url);
			if(!response.ok) throw response;
			const json = await response.json();
			setSchedule(json);
		}
		fetchSchedule();
	},[])
	
	return (
		<Container>
			<Banner title={ schedule.title} />
	    	<CourseList courses={ schedule.courses} />
	    </Container>
	);
};

export default App;
