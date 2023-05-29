// import React, {useEffect, useState} from 'react'


// function ListProfiles() {
//     const [users, setUsers] = useState([])
//     const [search, setSearch] = useState('')

//     const fetchData = async () => {
//         const response = await fetch('http://localhost:8000/users/')
//         if (response.ok) {
//             const data = await response.json();
//             setUsers(data.users)
//         }
//         else {
//             console.log("error")
//         }
//     }
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleSearch = event => {
//         setSearch(event.target.value.toLowerCase().includes(search))
//     }
//     const filterBio = users.filter(user =>
//         user.bio.toLowerCase().includes(search) || user.)


//     return (
//         <>
//         <h1 className="text-center mt-4">List Of Users</h1>
//         <from className="searchBar">
//             <input type="text"
//             className="searchBarinput"
//             placeholder="search preferences"
//             value={search}
//             onChange={handleSearch} />
//         </from>
//         </>
//     )
// }

// export default ListProfiles;
