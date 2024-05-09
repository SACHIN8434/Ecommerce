import React, { Fragment } from 'react'
import { Typography,Stepper,StepLabel,Step } from '@mui/material'

const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>
        },
        {
            label: <Typography>Confirm Order</Typography>
        },
        {
            label: <Typography>Payment</Typography>
        },
    ]
    return (
        <Fragment>
        <Stepper alternativeLabel activeStep={activeStep}>
        {
            steps.map((item,index)=>(
                <Step key={index}>
                    <StepLabel>{item.label}</StepLabel>
                </Step>
            ))
        }

        </Stepper>

        </Fragment>
    )
}

export default CheckoutSteps