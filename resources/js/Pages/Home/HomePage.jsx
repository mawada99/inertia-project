import { Head } from "@inertiajs/react";
// import Layout from "../Layout";
import LayoutWithDrawer from "../LayoutWithDrawo";
import {EchoConnection} from '../../echo';

export default function HomePage({}) {
    EchoConnection.channel('users').listenToAll(function(e) {
        console.log("----websocket-----", e);
    });
    return (
        <LayoutWithDrawer>
            <div>
                <Head title="Home Page" />
                <h1>Welcome</h1>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>
                <p>Hello, welcome to your first Inertia app!</p>

                <p>Hello, welcome to your first Inertia app!</p>
            </div>
        </LayoutWithDrawer>
    );
}
