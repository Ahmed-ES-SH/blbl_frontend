// pages/403.js
import Head from "next/head";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <>
      <Head>
        <title>403 Forbidden</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-red-600">403</h1>
          <h2 className="text-4xl font-semibold mt-4 text-gray-800">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page.
          </p>
          <Link
            className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            href="/"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
