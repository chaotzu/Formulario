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
        this.receivedEvent('deviceready');

        var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){
            alert("Se creo la base");
        }, function(){
            alert("Ocurrio un error");
        });
        
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Usuarios (nombre, rfc, edad, telefono, latitud, longitud)');            
          }, function(error) {
            alert('Transaction ERROR: ' + error.message);
          }, function() {
            alert('OK');
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