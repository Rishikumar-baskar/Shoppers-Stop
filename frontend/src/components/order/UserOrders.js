import { Fragment } from "react";
import MetaData from '../layouts/MetaData';
import {MDBDataTable} from 'mdbreact';

export default function UserOrders() {

    const setOrders = () => {
        const data = {
        columns: [
            {
                label: "Order ID",
                field: 'id',
                sort: "asc"
                
            },
              {
                label: "Number of Items",
                field: 'numOfItems',
                sort: "asc"
                
            },
              {
                label: "Amount",
                field: 'amount',
                sort: "asc"
                
            },
                 {
                label: "Status",
                field: 'status',
                sort: "asc"
                
            },
                 {
                label: "Actions",
                field: 'actions',
                sort: "asc"
                
            },
        ],
        rows: [

        ]
    }
    return data;
    }


    return(
        <Fragment>
            <MetaData title="My Orders"/>
            <h1 className="mt-5">My Orders</h1>
            <MDBDataTable className="px-3" bordered striped hover data={setOrders}/>
        </Fragment>
    )
}