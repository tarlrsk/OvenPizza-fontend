import {
    Table, Modal, Button, Form, select
} from "react-bootstrap";
import { BsXCircle } from 'react-icons/bs'
import { useState, useRef, useEffect, } from "react";
import './css/Basket.css'
import { useLocalStorage } from "react-use";

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


function Basket({ data, updateDataItems, clearDataItems }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const [dataBasket, setDataBasket] = useState();
    const [total, setTotal] = useState(0)
    const [modalInfo, setModalInfo] = useState(false);
    console.log("data arrive at basket", data)

    const [modalWarning, setModalWarning] = useState(false);
    console.log("kkkkkkkkkk", dataBasket)
    const refPhone = useRef();
    const refHno = useRef();
    const refRoad = useRef();
    const refSub = useRef();
    const refDis = useRef();
    const refProvince = useRef();
    const refPostalCode = useRef();

    const deleteItem = (id) => {
        var z = data.filter((value, index, arr) => value.temp_id != id)
        updateDataItems(z);
    }
    
    const confirm = () => {
        if (dataBasket.length === 0){
            setModalWarning(true)
        }else{
            setModalInfo(true)
        }
    }

    const confirmcheckout = () =>{
        if(refPhone.current.value.toString() === ""){
            setModalWarning(true)
        }else{
            if(refHno.current.value === ""){
                setModalWarning(true)
            }else{
                if(refRoad.current.value === ""){
                    setModalWarning(true)
                }else{
                    if(refSub.current.value === ""){
                        setModalWarning(true)
                    }else{
                        if(refDis.current.value === ""){
                            setModalWarning(true)
                        }else{
                            if(refProvince.current.value ===""){
                                setModalWarning(true)
                            }else{
                                if(refPostalCode.current.value ===""){
                                    setModalWarning(true)
                                }else{
                                    checkout()
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const checkout = () => {
        var address = refHno.current.value + ", " + refRoad.current.value + ", " + refSub.current.value + ", " + refDis.current.value + ", " + refProvince.current.value + ", " + refPostalCode.current.value
        data.map((v) => {
            const itemObj = {
                phone: refPhone.current.value.toString(),
                adress: address,
                item: v.item,
                price: v.price,
                ing: v.ing.current,
                qty: v.qty,
                status: "cooking"
            };

            console.log(itemObj)
            fetch(`${API_URL}/customers`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(itemObj), // body data type must match "Content-Type" header
            })
        })
        clearDataItems()
        setDataBasket([]);

        setModalInfo(false)
    }
    function Warning(props) {
        return (
            <Modal
                {...props}
                size="lg"
                centered
                className='my-modal'
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>
                            Warning</h2>
                    </Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={props.onHide}></button>
                </Modal.Header>
                <Modal.Body>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">There is some empty box out there!</Alert>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-cancel " onClick={props.onHide}>Close</button>
                </Modal.Footer>
            </Modal>
        )
    }
    function Infoform(props) {
        return (
            <Modal
                {...props}
                size="lg"
                centered
                className='confirm-modal'
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>Your Address</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="number" ref={refPhone}
                    />
                    <Form.Label style={{ marginTop: "5px" }} >House Number (ex: 55/12, XXX Village, Moo 6)</Form.Label>
                    <Form.Control
                        type="text" ref={refHno}
                    />
                    <Form.Label style={{ marginTop: "5px" }}  >Road</Form.Label>
                    <Form.Control
                        type="text" ref={refRoad}
                    />
                    <Form.Label style={{ marginTop: "5px" }}  >Subdistrict</Form.Label>
                    <Form.Control
                        type="text" ref={refSub}
                    />
                    <Form.Label style={{ marginTop: "5px" }}  >District</Form.Label>
                    <Form.Control
                        type="text" ref={refDis}
                    />
                    <Form.Label style={{ marginTop: "5px" }}  >Province</Form.Label>
                    <Form.Control
                        type="text" ref={refProvince}
                    />
                    <Form.Label style={{ marginTop: "5px" }}  >Postal code</Form.Label>
                    <Form.Control
                        type="text" ref={refPostalCode}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-cancel " onClick={props.onHide}>Cancel</button>
                    <button onClick={confirmcheckout} className="btn-add" >
                        Check Out
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }

    useEffect(() => {
        let sum = 0;
        const z = data.map((v, i) => {
            sum += v.amount
            console.log(v)
            return (
                <Table key={v.temp_id}>
                    <tbody className='basket-table'>
                        <tr>
                            <td className="basket-table">{v.item}</td>
                            <td className="basket-table" style={{ textAlign: "center" }}>x{v.qty}</td>
                            <td className="basket-table" style={{ textAlign: "right" }}>{v.amount} ฿</td>
                            <td style={{ width: "10px" }} className="basket-table" ><BsXCircle onClick={() => deleteItem(v.temp_id)} style={{ marginBottom: "3.1px", marginRight: "15px" }} /></td>
                        </tr>

                        {v.toppings.map((e) => {
                            console.log("asdasd", e)
                            return (
                                <tr >
                                    <td colSpan={3} className="basket-table small" style={{ textAlign: "left" }}>
                                        &nbsp;- &nbsp;&nbsp;{e}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        });
        setDataBasket(z);
        setTotal(sum);
    }, [data])

    return (

        <div className="basket-model">
            <div className="basket-wrapper">
                <div className="basket-header">
                    <h1>
                        Chart
                    </h1>
                </div>
                <div >
                    <div className="basket-detail flex-fill">
                        {dataBasket}
                    </div>
                    <br />
                </div>

                <div className='basket-footer'>
                    <div className="floatLeft total">Total
                    </div>
                    <div className="floatRight total">
                        {total} ฿
                    </div>
                    <div>
                        <button onClick={confirm} className="btn-checkout" >
                            Check Out
                        </button>
                    </div>
                </div>

            </div>

            <Infoform show={modalInfo} onHide={() => setModalInfo(false)} />
            <Warning show={modalWarning} onHide={() => setModalWarning(false)} />
        </div>
    )
}

export default Basket;