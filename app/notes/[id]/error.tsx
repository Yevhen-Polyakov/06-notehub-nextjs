"use client"

type ErrorIdProps = {
    error: Error
}

const ErrorId = ({error}:ErrorIdProps) => {
    return (
        <p>Could not fetch note details. {error.message}</p>

    )
}

export default ErrorId