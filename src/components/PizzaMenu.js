import React, { useEffect, useState, useRef, } from 'react';
import { useLocalStorage } from "react-use"
import './css/PizzaMenu.css';
import one from './images/1_Beacon.webp';
import two from './images/2_ShrimpCocktail.webp';
import three from './images/3_ChickenTrio.webp';
import four from './images/4_SpicySeafood.webp';
import five from './images/5_Hawaiian.webp';
import six from './images/6_SeafoodCocktail.webp';
import seven from './images/7_Pepperoni.webp';
import eight from './images/8_DoubleCheese.webp';
import nine from './images/9_ChickenSpicy.webp';
import { v4 as uuid } from 'uuid';
import {
    Table, Modal, Button, Form, select
} from "react-bootstrap";
import Basket from './Basket';


const API_URL = process.env.REACT_APP_API_URL;

function PizzaMenu() {
    const [pizza, setPizza] = useState();
    const [pizzaFlex, setPizzaFlex] = useState();
    const pic = [one, two, three, four, five, six, seven, eight, nine]
    const [modalShow, setModalShow] = useState(false);
    const [modalQTY, setModalQTY] = useState(false);
    const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
        "data-items",
        JSON.stringify([])
    );
    const [totalFlex, setTotalFlex] = useState(0)
    const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));
    const [qty, setQTY] = useState(1)
    const toppings = [
        { "name": " " },
        { "name": "Tomato", "price": 20 },
        { "name": "Onions", "price": 20 },
        { "name": "Baby Corn", "price": 20 },
        { "name": "Mushroom", "price": 20 },
        { "name": "Extra Mozzaralla Chesse", "price": 30 }
    ]


    const refCode = useRef();
    const refName = useRef();
    const refPrice = useRef();
    const refTopping = useRef();
    const refTopping_strings = useRef();



    const handleSelect = (pizza) => {
        console.log("Click Select", pizza);
        refCode.current = pizza.code;
        refName.current = pizza.name;
        refPrice.current = pizza.price;
        console.log(refCode);
        console.log(refName);
        console.log(refPrice);

        setModalShow(true)

    }

    const updateDataItems = (dataItems) => {
        setDataItems([...dataItems]);
        setLocalDataItems(JSON.stringify(dataItems));
    }

    const addToCart = () => {
        var itemObj = {
            temp_id: uuid(),
            phone: "",
            adress: "",
            item: refName.current,
            price: refPrice.current,
            toppings: refTopping.current,
            ing: refTopping_strings,
            amount: totalFlex,
            qty: qty
        };
        console.log(itemObj)
        dataItems.push(itemObj);
        setDataItems([...dataItems]);
        setLocalDataItems(JSON.stringify(dataItems));
        console.log("cart", dataItems)
        setModalQTY(false)
    }

    const clearDataItems = () => {
        setDataItems([]);
        setLocalDataItems(JSON.stringify([]));
    }


    

    function ChangeQTY(props) {
        const qtyIncrease = () => {
            setQTY(qty + 1)
            console.log(qty, "Price")
        }

        const qtyDecrease = () => {
            if (qty != 1) {
                setQTY(qty - 1)
                setTotalFlex(qty * refPrice.current)
            }
        }

        setTotalFlex(qty * refPrice.current)

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
                            {refName.current}</h2>
                    </Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={props.onHide}></button>
                </Modal.Header>
                <Modal.Body>
                    <button className="pizza-change-number" onClick={qtyIncrease}>+</button>
                    <div className='pizza-number'>{qty}</div>
                    <button className="pizza-change-number " onClick={qtyDecrease}>-</button>
                    <br />
                    <br />
                    <div style={{ marginTop: "10px" }}>
                        <div className="floatLeft" style={{ fontSize: "140%" }}>Total:</div>
                        <div className="floatRight" style={{ fontSize: "140%", marginRight: "10px" }}>{totalFlex} ฿</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-cancel " onClick={props.onHide}>Cancel</button>
                    <button className="btn-add " onClick={addToCart}>Add to cart</button>
                </Modal.Footer>
            </Modal>
        );
    }
    function AddToppings(props) {

        const [checkedState, setCheckedState] = useState(
            new Array(toppings.length).fill(false)
        );
        console.log(checkedState)

        const [total, setTotal] = useState(refPrice.current);


        const handleOnChange = (position) => {
            const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            );

            setCheckedState(updatedCheckedState);

            var totalPrice = updatedCheckedState.reduce(
                (sum, currentState, index) => {
                    if (currentState === true) {
                        return sum += toppings[index].price;
                    }
                    return sum;
                },

            );
            totalPrice += refPrice.current
            setTotal(totalPrice);
        };



        const handleNext = () => {
            setQTY(1)
            setModalQTY(true)
            setTotalFlex(total)
            refPrice.current = total
            let customer_toppings = []
            checkedState.map((bool, i) => {
                if (bool === true) {
                    toppings.map((v, n) => {
                        if (n === i) {
                            customer_toppings = customer_toppings.concat(v.name)
                        }
                    })
                }
            })
            refTopping.current = customer_toppings
            refTopping_strings.current = customer_toppings.join(" + ")
            setModalShow(false)
        }


        return (
            <Modal
                {...props}
                size="lg"
                centered
                className='my-modal'
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2>
                            {refName.current}</h2>
                    </Modal.Title>
                    <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={props.onHide}></button>
                </Modal.Header>
                <Modal.Body>
                    <h3>Select Toppings</h3>
                    {toppings.map(({ name, price }, index) => {
                        if (index != 0) {
                            return (
                                <div className="toppings-list-item" key={index}>
                                    <div className="floatLeft">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
                                        />&nbsp;&nbsp;&nbsp;
                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                    </div>
                                    <div className="floatRight">
                                        <label htmlFor={`custom-checkbox-${index}`}>{price} ฿</label>
                                    </div>
                                    <br />
                                </div>
                            );

                        } else {
                            return null;
                        }
                    })}
                    <div style={{ marginTop: "10px" }}>
                        <div className="floatLeft" style={{ fontSize: "140%" }}>Total:</div>
                        <div className="floatRight" style={{ fontSize: "140%", marginRight: "10px" }}>{total} ฿</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn-cancel " onClick={props.onHide}>Cancel</button>
                    <button className="btn-next " onClick={handleNext}>Next</button>
                </Modal.Footer>


            </Modal>
        );
    }



    useEffect(() => {
        fetch(`${API_URL}/pizzainfo`)
            .then((res) => res.json())
            .then((data) => {
                const z = pic.map((e, i) => {
                    const v = data.find(data => data.code === i + 1)
                    if (v !== undefined) {
                        return (
                            <div className="flex-item" key={i + 1}>
                                <img className="product-image" ng-src={e} src={e} />
                                <div>{v.name}</div>
                                <button value={v.name} className="btn-select" onClick={() => handleSelect(v)}>
                                    <span style={{ float: "left" }}>{v.price} ฿</span>
                                    <span style={{ float: "right" }}>Select</span>
                                </button>
                            </div>
                        )
                    } else {
                        return null;
                    }
                });

                setPizzaFlex(z);
                setPizza(data)

                console.log(pizza)
            })

    }, []);

    return (
        <div className="c">
            <div className="flex-container">
                {pizzaFlex}

                <Basket data={dataItems} updateDataItems={updateDataItems} clearDataItems={clearDataItems} />
            </div>
            <AddToppings
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <ChangeQTY show={modalQTY} onHide={() => setModalQTY(false)} />
            
        </div>

    );
}

export default PizzaMenu;