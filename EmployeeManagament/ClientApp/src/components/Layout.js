import React, { Component } from 'react';
import { Container } from 'reactstrap';


export const Layout = ({ children }) => {
    return (
        <>
            <Container tag="main-layout">
                {children}
            </Container>
        </>
    )
}