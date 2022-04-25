module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getInventory(res, mysql, context, complete){
        mysql.pool.query("SELECT inventory_id as id, inventory_name, serial_number, quantity FROM inventory", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.inventory = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteinventory.js"];
        var mysql = req.app.get('mysql');
        getInventory(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >=1){
                res.render('inventory', context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO inventory (inventory_name, serial_number, quantity) VALUES (?,?,?)";
        var inserts = [req.body.inventory_name, req.body.serial_number, req.body.quantity];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/inventory');
            }
        });
    });

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM inventory WHERE inventory_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        });
    });
        

    return router;
}();