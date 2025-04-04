'use client';

export default function ShowButton(props) {

    const { name, setHide, value } = props

    const changeHide = () => {
        setHide(!value)
    }

    return (
        <button className="p-2 bg-gray-600 rounded-md" onClick={changeHide}>{name}</button>
    )

}
