import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeletePostButton({ id }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/social/posts/${id}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDelete() {
    try {
      await http.delete(url);
      history("/feed");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      <button type='button' className='cta deleteBtn hoverBtn' onClick={handleShow}>
        {error ? "Error" : "Delete"}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You are about to delete this post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the post?</Modal.Body>
        <Modal.Footer>
          <Button className='cta cancelBtn' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='cta deleteBtnSmall' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeletePostButton.propTypes = {
  id: PropTypes.number.isRequired,
};
