    import React from 'react';
    import '../static/css/dashboard.css';
    import '../static/css/card.css';
    import Header from  '../components/header';
    import BarChart from '../components/barchart';
  

    function Dashboard() {
        const chartData = {
            labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
            values: [12, 19, 3, 5, 2],
          };
        
       
        return(
    
            <div>
                <Header />
                <main>
                    <BarChart data={chartData} />   
             
                </main>
                
                
            </div>

            
        )
    }


    export default Dashboard