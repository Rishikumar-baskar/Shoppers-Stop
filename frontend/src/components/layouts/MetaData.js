import { Helmet } from "react-helmet-async";


export default function MetaData({title}){
    return(
        <Helmet>
            <title>{`${title} - Shoppers Stop`}</title>
             <meta name="description" content="Shop the best products at Shoppers Stop - your one-stop destination for quality products" />
            <meta name="keywords" content="shopping, products, electronics, fashion, shoppers stop" />
        </Helmet>

    )

}
