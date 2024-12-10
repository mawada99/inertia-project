import Layout from './Layout'
import { Head } from "@inertiajs/react";

export default function Welcome({test_message}) {
    return (
        <Layout>
            <Head title="Welcome" />
            <h1>Welcome</h1>
            <p>Hello, welcome to your first Inertia app!</p>
            <p>{test_message}</p>
        </Layout>
    );
}
