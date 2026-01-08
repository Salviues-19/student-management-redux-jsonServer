import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStudent } from "../redux/studentSlice";
import { useParams, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function EditStudent() {
  const { id } = useParams();
  const students = useSelector(state => state.students);
  const student = students.find(s => s.id === Number(id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");

  // Fetch if Redux store does not have the student (page refresh)
  useEffect(() => {
    if (!student) {
      fetch(`http://localhost:5000/students/${id}`)
        .then(res => res.json())
        .then(data => {
          setName(data.name);
          setAge(data.age);
          setCourse(data.course);
        });
    } else {
      // Populate from Redux store
      setName(student.name);
      setAge(student.age);
      setCourse(student.course);
    }
  }, [id, student]);

  const handleUpdate = () => {
    const updatedStudent = {
      id: Number(id),
      name,
      age: Number(age),
      course
    };

    fetch(`http://localhost:5000/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent)
    }).then(() => {
      dispatch(updateStudent(updatedStudent));
      navigate("/");
    });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Student</Card.Title>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Enter age"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    type="text"
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    placeholder="Enter course"
                  />
                </Form.Group>

                <Button variant="success" onClick={handleUpdate}>
                  Update Student
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditStudent;
