/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');


        //Obtener ubicacion

        var onSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
            $('#latitud').val(position.coords.latitude);
            $('#longitud').val(position.coords.longitude);
            
        };
    
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //FIN obtener ubicacion
        

        var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){
            //alert("Se creo la base");
        }, function(){
            alert("Ocurrio un error");
        });
        
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Usuarios (nombre, rfc, edad, telefono, latitud, longitud)');            
          }, function(error) {
            alert('Transaction ERROR: ' + error.message);
          }, function() {
            //alert('OK');
          });

          //tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
          //tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);

          //Agregar
          $('#guardar').on('click', function(){
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){                
            }, function(){
                alert("Ocurrio un error");
            });

            //Validar campos
            var nombre = $('#nombre').val();            
            var rfc = $('#nombre').val();            
            var edad = $('#nombre').val();            
            var telefono = $('#nombre').val();            
            var latitud = $('#nombre').val();            
            var longitud = $('#nombre').val();            
            if(nombre == "" | rfc == "" | edad == "" | telefono == "" | latitud == "" | longitud == ""){
                alert("Debes agregar todos los campos");
            }else{

            db.transaction(function(tx) {                                                            
                tx.executeSql('INSERT INTO Usuarios VALUES (?,?,?,?,?,?)', [nombre, rfc, edad, telefono, latitud, longitud]);                
              }, function(error) {
                alert('Transaction ERROR: ' + error.message);
              }, function() {
                alert('Insertado');
            });
        }
              

        });


        //Buscar
        var filtro = "";
        /*$('#fahrgaeste').find('input[type=checkbox]').click(function() {
                        var checked = $(this).is(':checked');
                         
                         $('#fahrgaeste').find('input[type=checkbox]').each(function(){
                         
                               document.getElementById($(this).attr('id')).checked = false;
                        });
                        if(checked)
                            $(this).prop("checked", true);             
                 });
        $('.check').change(function () {
                if (this.checked) {
                    /*$li = $('<li></li>');
                    $li.text(this.value);
                    $('#checkbox_transfer').append($li);*/
         /*           filtro = this.value;
                } else {
                    /*$('li:contains(' + this.value + ')', '#checkbox_transfer').remove();*/
         /*       }
        });	*/	

        $('#buscarBoton').on('click', function(){
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){                
            }, function(){
                alert("Ocurrio un error");
            });
            
            var nombre = $('#textoBuscar').val();
            //alert(nombre);

            if(nombre != ""){
                    /*db.transaction(function(tx) {
                    tx.executeSql('SELECT rfc FROM Usuarios WHERE nombre = (?)', [nombre]);                
                    }, function(error) {
                        alert('Transaction ERROR: ' + error.message);
                    }, function() {
                        alert("Item obtenido");
                    });*/
            
                    db.transaction(function(transaction) {
                        transaction.executeSql('SELECT * FROM Usuarios WHERE nombre = (?)', [nombre], function (tx, results) {
                            alert("Obtenidos");
                            var len = results.rows.length, i;
                            //$("#rowCount").append(len);
                            for (i = 0; i < len; i++){
                                alert(results.rows.item(i).nombre);
                                alert(results.rows.item(i).edad);
                            //$("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>");
                            }
                        }, null);
                    });

                    db.transaction(function(tx) {
                        tx.executeSql('SELECT count(*) AS mycount FROM Usuarios', [], function(tx, rs) {
                            alert(rs.rows.item(0).mycount);                      
                          }, function(tx, error) {
                            alert('SELECT error: ' + error.message);
                          });                        
                    });
                                        
                                                            
            }
        
              

        });                        



        //Borrar
        $('#borrarBoton').on('click', function(){
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){                
            }, function(){
                alert("Ocurrio un error");
            });
            
            var busqueda = "nombre";

            if($("#rfcRadio").checked == true){
                busqueda="rfc"
            }
            else{
                busqueda = "nombre"
            }

            var nombre = $('#borrarNombre').val();
            //alert(nombre);

            if(nombre != ""){

                    db.transaction(function(transaction) {
                    var executeQuery = "DELETE FROM Usuarios where " + busqueda + "=?";
                    transaction.executeSql(executeQuery, [nombre],
                    //On Success
                    function(tx, result) {alert('Borrado correctamente');},
                    //On Error
                    function(error){alert('Ocurrió un error');});
                    });

                    db.transaction(function(tx) {
                        tx.executeSql('SELECT count(*) AS mycount FROM Usuarios', [], function(tx, rs) {
                            alert(rs.rows.item(0).mycount);                      
                          }, function(tx, error) {
                            alert('SELECT error: ' + error.message);
                          });                        
                    });
                                                    
                                                            
            }
        
              

        });                        


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    }
};

app.initialize();