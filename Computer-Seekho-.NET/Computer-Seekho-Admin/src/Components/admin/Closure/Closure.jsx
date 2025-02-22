import React,{ useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmDialog from "../Utility/ConfirmDialog";
import "./Closure.css";

const Closure = () => {
    const [search, setSearch] = useState("");
    const [Closure, setClosure] = useState([]);

    useEffect(() => {
      const fetchClosures = async () => {
        try {
          const response = await fetch("http://localhost:8080/closureReasons/all");
          if (!response.ok) throw new Error("Something went wrong!");

          const result = await response.json();
          setClosure(result);
        } catch (error) {
          toast.error(error.message);
        }
      };
      fetchClosures();
    }, []);

    return (
      <div className="container">
        <Toaster/>
        <h3 className="title">Closure</h3>
        <div className="actions">
          <input
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
  
        <div className="table-container">
          <table className="Closure-table">
            <thead>
              <tr className='table-header'>
                <th className="id-column" style={{color:"white"}}>No</th>
                <th style={{color:"white",textAlign:'center'}}>Enquirer Name</th>
                <th style={{color:"white",textAlign:'center'}}>Closure Reason</th>
                
              </tr>
            </thead>
          </table>
          <div className="table-body-container">
            <table className="Closure-table">
              <tbody>
                {Closure
                  .filter((item) =>
                    search === "" ||
                    item.enquirerName.toLowerCase().includes(search.toLowerCase()) ||
                    item.closureReasonDesc.toLowerCase().includes(search.toLowerCase()) 
                  )
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td className="id-column">{idx + 1}</td>
                      <td>{item.enquirerName}</td>
                      <td>{item.closureReasonDesc}</td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Closure;
