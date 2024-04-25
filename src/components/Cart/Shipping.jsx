import React, { Fragment } from 'react'
import { Country, State, City } from 'country-state-city';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
//function to set shippinginfo is
import { saveShippingInfo } from "../../slices/cartSlice"
import { GrHome } from "react-icons/gr";




const Shipping = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        address: "",
        city: "",
        state: "",
        pinCode: "",
        phoneNo: "",
        country: "",
    })

    const { address, city, state, pinCode, phoneNo, country } = formData;

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }
    useEffect(() => {
        // dispatch(saveShippingInfo());
        console.log(formData);

    }, [formData])
    return (
        <Fragment>
            <div>Shipping</div>

            <form>

                <div>
                    <GrHome />
                    <input
                        type='text'
                        placeholder='Address'
                        value={formData.address}
                        onChange={handleOnChange}
                        name='address'
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='City'
                        value={formData.city}
                        onChange={handleOnChange}
                        name='city'
                    />

                </div>
                <div>
                    <input
                        type='number'
                        placeholder='pinCode'
                        value={formData.pinCode}
                        onChange={handleOnChange}
                        name='pinCode'
                    />

                </div>
                <div>
                    <input
                        type='number'
                        placeholder='Phone Number'
                        value={formData.phoneNumber}
                        onChange={handleOnChange}
                        name='pinCode'
                        size={10}
                        required
                    />
                </div>

                <div>
                    <select
                        required
                        onChange={handleOnChange}
                        name='country'
                        value={formData.country}
                    >
                        <option value="">Country</option>
                        {Country && Country.getAllCountries().map((item, index) => (
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {
                    country && 
                    (<div>
                    <select
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleOnChange}
                    >
                    <option value="">State</option>
                    {
                        State && State.getStatesOfCountry(country).map((item, index) => (
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))
                    }
                    </select>
                    </div>)
                }

                {
                    state && <button type="submit">Submit</button>
                }
            </form>

        </Fragment>
    )
}

export default Shipping