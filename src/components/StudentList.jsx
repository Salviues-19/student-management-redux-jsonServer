import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../style.css';
import { deleteStudent, setStudents } from "../redux/studentSlice";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";

function StudentList() {
  const students = useSelector(state => state.students);
  const dispatch = useDispatch();

  // this useEffect will show the current students in the studentList page
  useEffect(() => {
  fetch("http://localhost:5000/students")
    .then(res => res.json())
    .then(data => dispatch(setStudents(data)));
}, [dispatch]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE"
    }).then(() => {
      dispatch(deleteStudent(id));
    });
  };

  return (
    <Container className="mt-4">

      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <h2>Student List</h2>
        </Col>

        <Col
          xs={12}
          md={6}
          className="text-md-end mt-2 mt-md-0"
        >
          <Link to="/add">
            <Button variant="primary">Add Student</Button>
          </Link>
        </Col>
      </Row>

      
      <Table
       striped
  bordered
  hover
  responsive
  style={{ border: "1px solid black" }}
  className="text-center align-middle"
      >
        <thead className="custom-thead">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No Students Found</td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>
                  <Link to={`/edit/${student.id}`}>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </Table>
    </Container>
  );
}

export default StudentList;
