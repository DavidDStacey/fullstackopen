import React from 'react'

const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ content }) => {
    return (
        <>{content.map((part) => 
        <Part key={part.id} part={part} />)}</>
    )
}

const Total = ({ content }) => {
    const total = content.reduce((sum, part) => {
        sum = sum + part.exercises;
        return sum
    }, 0)
    return (
        <h3>total of {total} exercises</h3>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content content={course.parts} />
            <Total content={course.parts} />
        </>
    )
}

export default Course