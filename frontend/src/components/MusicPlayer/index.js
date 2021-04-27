import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import Header from "./Header";
import Playbar from "./Playbar";
import Playlist from "./Playlist";

export default function MusicPlayer() {
    return (
        <>
            <Header />
            <Playlist />
            <Playbar />
        </>
    );
}
