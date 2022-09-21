const Header = ({ text }) => <h2>{text}</h2>

const Total = ({ parts }) => 
  <p>
    <b>total of {parts.reduce((sum, a) => sum + a.exercises, 0)} exercises</b>
  </p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(p => <Part key={p.name} part={p} />)

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}


export default Course