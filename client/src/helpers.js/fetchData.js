export default hanldleFetchDatas = async (
  id = null,
  method,
  datas = '',
  apiName
) => {
  let result = '';
  try {
    console.log(PackageId, 'del///');
    const response = await fetch(`http://localhost:4000/${apiName}/${id}:`, {
      method: method,
      body: datas !== '' ? datas : {},
      headers: {
        Accept: 'application/json',
      },
    });

    // const response = await fetch('http://localhost:4000/delivery/', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    let result = await response.json();
    console.log('delivery-id', result);
    // console.log('delivery-methode', method);
    // console.log('delivery-data', datas);
    // console.log('delivery-apiName', `http://localhost:4000/${apiName}/${id}`);

    console.log('activity_existe');

    // console.log('result is: ', JSON.stringify(result, null, 4));
    // localStorage.setItem('Package', result);

    // setPackage(result);
    return result;
  } catch (err) {
    // setErr(err.message);
    console.log(err, 'erreur');
  }
  return result;
};

// let fetchOptionData ={
//   id:"649392b94039e5e2b3e9099b",
//   method:"GET",
//   datas:"",
//   apiName:"package"
// }

// hanldleFetchDatas(fetchOptionData).then(
//   (res) => {
//     console.log(res, 'testsssss');
//   }
// );
