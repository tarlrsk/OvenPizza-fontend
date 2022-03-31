
import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../App.css";
import './css/Track.css'

export default function Track(data, clearDataItems, updateDataItems) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState({

    phone: "unknown",
    item: "unknown",
    ing: "unknown",
    price: 0,
    qty: 0,
    adress: "unknown",
    status: "cooking"
  });

  // Input references
  const refID = useRef();
  const refPhone = useRef();
  const refItem = useRef();
  const refIng = useRef();
  const refPrice = useRef();
  const refAmount = useRef();
  const refQty = useRef();
  const refAdress = useRef();
  const refDate = useRef();
  const refStatus = useRef();

  useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then((res) => res.json())
      .then((data) => {
        let sum = 0;
        const rows = data.map((e, i) => {
          let amount = e.qty * e.price;
          sum += amount;
          refAmount.current = amount
          return (
            <tr key={i}>
              <td>
                <FaPencilAlt
                  onClick={() => {
                    handleUpdate(e);
                  }}
                />
                &nbsp;
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.phone}</td>
              <td>{e.item}</td>
              <td>{e.ing}</td>
              <td>{formatNumber(e.price)}</td>
              <td>{Number(e.qty)}</td>
              <td>{e.adress}</td>
              <td>{e.status}</td>
              <td>{e.date}</td>
              <td>{formatNumber(refAmount.current)}</td>
            </tr>
          );
        });

        setProducts(data);
        setProductRows(rows);
        setTotal(sum);
      });
  }, [data]);


  const handleClose = () => {
    //setModeAdd(false);
    setShow(false);
  };

  const handleDelete = (product) => {
    console.log(product);
    if (window.confirm(`Are you sure to delete ${product.item} by ${product.phone}?`)) {
      fetch(`${API_URL}/customers/${product._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted

          console.log("DELETE Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === product._id) {
              products.splice(i, 1);
              break;
            }
          }
          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.phone}</td>
                <td>{e.item}</td>
                <td>{e.ing}</td>
                <td>{e.price}</td>
                <td>{e.qty}</td>
                <td>{e.adress}</td>
                <td>{e.status}</td>
                <td>{e.date}</td>
                <td>{formatNumber(refAmount.current)}</td>
              </tr>
            );
          });

          setProducts(products);
          setProductRows(rows);
          handleClose();
          window.location.reload();
        });
    }
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleShow = () => setShow(true);

  const handleUpdate = (product) => {
    console.log("Update Product", product);
    console.log(refPhone);
    refPhone.current = product.code;

    setShow(true);
    setProduct(product);
  };

  const handleShowAdd = () => {
    //setModeAdd(true);
    setShow(true);
  };

  const handleFormAction = () => {
    // Update product
    const updatedProduct = {
      _id: refID.current,
      phone: refPhone.current.value,
      adress: refAdress.current.value,
      status: refStatus.current.value,
      qty: refQty.current,
      price: refPrice.current,
      ing: refIng.current,
      item: refItem.current,
      date: refDate.current
    };
    console.log(updatedProduct);

    fetch(`${API_URL}/customers`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(updatedProduct), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then((json) => {
        // Successfully updated the product
        console.log("PUT Result", json);
        for (let i = 0; i < products.length; i++) {
          if (products[i]._id === updatedProduct._id) {
            console.log(products[i], updatedProduct);
            products[i] = updatedProduct;
            break;
          }
        }

        const rows = products.map((e, i) => {
          return (
            <tr key={i}>
              <td>
                <FaPencilAlt
                  onClick={() => {
                    handleUpdate(e);
                  }}
                />
                &nbsp;
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>

              <td>{e.phone}</td>
              <td>{e.item}</td>
              <td>{e.ing}</td>
              <td>{formatNumber(e.price)}</td>
              <td>{e.qty}</td>
              <td>{e.adress}</td>
              <td>{e.status}</td>
              <td>{e.date}</td>
              <td>{formatNumber(refAmount.current)}</td>
            </tr>
          );
        });

        setProducts(products);
        setProductRows(rows);
        handleClose();
      });

  };

  return (
    <>
      <div className="setBG">
        <Container>
          <div style={{ padding: "20px" }}></div>

          <div style={{ background: "white", padding: "30px", borderRadius: "8px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>&nbsp;</th>
                  <th className={style.textCenter}>Phone</th>
                  <th className={style.textCenter}>Item</th>
                  <th className={style.textCenter}>Ingredient</th>
                  <th className={style.textCenter}>Price</th>
                  <th className={style.textCenter}>Qty</th>
                  <th className={style.textCenter}>Adress</th>
                  <th className={style.textCenter}>Status</th>
                  <th className={style.textCenter}>Date</th>
                  <th className={style.textCenter}>Amount</th>
                </tr>
              </thead>
              <tbody>{productRows}</tbody>
              <tfoot>
                <tr>
                  <td colSpan={9} className={style.textRight}>
                    Total
                  </td>
                  <td className={style.textCenter}>
                    {formatNumber(total)}
                  </td>
                </tr>
              </tfoot>
            </Table>

          </div>
        </Container>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {"Update Status"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Status</Col>
              <Col>
                <input type="text" ref={refStatus} defaultValue={product.status} />
              </Col>
            </Row>
            <Row>
              <Col>Phone</Col>
              <Col>
                <input type="text" ref={refPhone} defaultValue={product.phone} />
              </Col>
            </Row>
            <Row>
              <Col>Adress</Col>
              <Col>
                <input type="text" ref={refAdress} defaultValue={product.adress} />
              </Col>
            </Row>
            <p style={{visibility:"hidden", fontSize:"0.001px"}}>{refItem.current = product.item}
            {refPrice.current = product.price}
            {refIng.current = product.ing}
            {refQty.current = product.qty}
            {refID.current = product._id}
            {refDate.current = product.date}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {"Update"}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}