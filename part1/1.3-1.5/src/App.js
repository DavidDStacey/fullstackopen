import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  let parts = props.course["parts"]
  const [part1, part2, part3] = parts

  return (
    <>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />
    </>
  )
}
const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = (props) => {
  console.log(props)
  let total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

export default App