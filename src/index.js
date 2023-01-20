const express = require('express');
const SalarioRoutes = require('./routes/salarioRoutes');
const UsuarioRoutes = require('./routes/usuarioRoutes');
const GastosMensalTotalRoutes = require('./routes/gastosMensalTotalRoutes');
const GastosFixosMensaisRoutes = require('./routes/GastosFixosMensaisRoutes');
const GastosVariaveisMensaisRoutes = require('./routes/GastosVariaveisMensaisRoutes');
const ComprasParceladasRoutes = require('./routes/ComprasParceladasRoutes');
const CategoriaRoutes = require('./routes/CategoriaRoutes');
const DinheiroGuardadoRoutes = require('./routes/DinheiroGuardadoRoutes');
const StatusPagamentoRoutes = require('./routes/StatusPagamentoRoutes');
require('express-async-errors');

const app = express();
app.use(express.json());
app.use('/salario', SalarioRoutes);
app.use('/usuario', UsuarioRoutes);
app.use('/gasto-mensal-total', GastosMensalTotalRoutes);
app.use('/gasto-fixos-mensais', GastosFixosMensaisRoutes);
app.use('/gastos-variaveis-mensais', GastosVariaveisMensaisRoutes);
app.use('/compras-parceladas', ComprasParceladasRoutes);
app.use('/categoria', CategoriaRoutes);
app.use('/dinheiro-guardado', DinheiroGuardadoRoutes);
app.use('/status-pagamento', StatusPagamentoRoutes)

// app.use(routes);
app.use((error, request, response, next) => {
  console.log('### ERROR HANDLER');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('Server started!!'));
