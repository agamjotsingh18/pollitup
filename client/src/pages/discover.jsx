import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps'

import {
    Box, 
    Heading,
    SimpleGrid,
    Container,
    //useToast
} from "@chakra-ui/react";

import Poll from '../components/poll';
import Pollpopup from '../components/pollPopup';
import { getCol } from '../lib/db.js';
import ProfileMarker from '../components/imgMarker';

/* const containerStyle = {
    width: '100%',
    height: '50vw'
}; */

/* const center = {
    lat: -3.745,
    lng: -38.523
}; */

export default function Discover(){

    const [markers, setMarkers] = React.useState(null);
    //const [location, setLocation] = React.useState([]);
    //const toast = useToast();

    React.useEffect(() => {

        async function fetchPolls() {
            setMarkers(await getCol("polls"));
        }
        fetchPolls();

        /*if (navigator.geolocation) { //check if geolocation is available
            await navigator.geolocation.getCurrentPosition(async function(pos){
                setLocation([pos.coords.latitude, pos.coords.longitude]);
            }, 
            function(error){
                setLoading(false);
                toast({
                    title: "Error",
                    description: "Location Data in-accessible or denied",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
        
            })
        }*/
    },[]);

    const [post, setPost] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const getProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

    function handleClick(payload){
        setPost(payload);
        setShowPopup(true);
    }


    if (markers){
        return (
            <Box align="center">
                <Heading as="h1" m={12}>Discover</Heading>
                {showPopup && <Pollpopup set={setShowPopup} data={post} />}
                <Box w="90%" h="80vh" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Map defaultCenter={[39.0831315, -77.2049467]} defaultZoom={12} width="100%" height="100%" provider={getProvider}>
                        {
                            markers.map(marker => <Marker anchor={[marker.location._lat, marker.location._long]}  width={50} height={50} onClick={() => handleClick(marker)} />)
                        }
                        {
                            markers.map(marker => 
                                <Overlay anchor={[marker.location._lat, marker.location._long]} offset={[18, 54]} >
                                    <ProfileMarker marker={marker} set1={setPost} set2={setShowPopup} />
                                </Overlay>
                            )
                        }
                        
                    </Map>
                </Box>

                <Container maxW="container.lg" mt={12}>
                    <Heading>Most Recent Polls</Heading>
                    <SimpleGrid p={8} columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                        {markers.slice(-8).map(marker => <Poll /*pollvoting={true}*/ name={marker.name} description={marker.description} data={marker} />)}
                    </SimpleGrid>
                </Container>
            </Box>
        )
    }
    else{
        return(
            <></>
        )
    }
}