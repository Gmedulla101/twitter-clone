const Header = () => {
    return (
        <header className="bg-slate-500 text-white flex justify-between items-center border-red-500 px-9 py-4 shadow-2xl transition ease-in-out duration-300 xxs:flex-col xxs:gap-9 mmd:flex-row mmd:px-4 mmmd:px-9">
            <h1 className='logo text-4xl font-bold' > Hillel </h1>
            <nav>
                <ul className="flex justify-around items-center gap-4 xxs:flex-col mmd:flex-row md:gap-3 text-sm">
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer"> About </li>
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer"> Students </li>
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer"> Parents & Alumni </li>
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer"> Holidays </li>
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer">  Support </li>
                    <li className="hover:bg-yellow-500 px-4 py-2 mmd:p-0 rounded-lg cursor-pointer"> Hilel kitchen </li>
                    <li className="bg-yellow-500 p-2 font-bold rounded-tl-lg rounded-br-lg transition-all ease-in-out duration-500 hover:scale-125 cursor-pointer"> The Mem Den </li>
                    <li className="bg-white p-2 text-slate-900 font-bold rounded-tl-lg rounded-br-lg cursor-pointer transition-all ease-in-out duration-500 hover:scale-125"> Donate </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;