import { useState } from 'react';

function App() {

  const [mahasiswa, setMahasiswa] = useState([]);
  const [aspek, setAspek] = useState(4);
  const [json, setJson] = useState(null);


  let heading = [];
  let noAspek = 1;
  for (let index = 0; index < aspek; index++) {
    heading.push({ label: "Aspek Penilaian", name: "aspek_penilaian_" + noAspek });
    noAspek++
  }

  const addMahasiswa = () => {
    let obj = {
      nama: "Mahasiswa " + (mahasiswa.length + 1)
    }

    let no = 1;
    for (let index = 0; index < aspek; index++) {
      obj['aspek_penilaian_' + no] = null;
      no++;
    }

    let arr = [...mahasiswa];
    arr.push(obj);
    setMahasiswa(arr);
  }

  const handleSelectChange = (indexMahasiswa, aspek, value) => {
    let mhs = mahasiswa;
    mhs[indexMahasiswa][aspek] = parseInt(value);
    setMahasiswa(mhs);
  }

  const addAspek = () => {
    setAspek(aspek + 1);
  }

  const onSubmit = () => {
    let obj = {};
    let noAspek = 1;
    for (let index = 0; index < aspek; index++) {
      const namaAspek = 'aspek_penilaian_' + noAspek;
      obj[namaAspek] = {}
      noAspek++;

      for (let index2 = 0; index2 < mahasiswa.length; index2++) {
        let mhs = mahasiswa[index2];
        const namaMhs = mhs.nama.split(" ").join("_").toLowerCase();
        obj[namaAspek][namaMhs] = mhs[namaAspek];
      }
    }
    setJson(JSON.stringify(obj, null, 2));
    console.log(obj);
  }

  return (
    <div className="App">
      <h2 className='text-center' style={{ marginTop: '30px', marginBottom: '50px' }}>Aspek Penilaian Mahasiswa</h2>
      <div className="container">
        <div className='mb-3' style={{ textAlign: 'right' }}>
          {mahasiswa.length === 0 && <button className='btn btn-secondary btn-sm mr-2' onClick={addAspek}>Tambah Aspek</button>}
          <button className='btn btn-info btn-sm' onClick={addMahasiswa}>Tambah Mahasiswa</button>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td></td>
              {
                heading.map((h, key) => {
                  return <td key={key}>{h.label + (++key)}</td>
                })
              }
            </tr>
            {mahasiswa.length === 0 && (
              <tr>
                <td colSpan={aspek + 1} className='text-center'>
                  Data Mahasiswa Kosong!
                </td>
              </tr>
            )}
            {mahasiswa.map((m, key) => {
              return (
                <tr key={key}>
                  <td>
                    <div className='d-flex'>
                      <img src='https://e7.pngegg.com/pngimages/981/645/png-clipart-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette.png' width={30} style={{ marginRight: '5px' }} alt='alt' />
                      {m.nama}
                    </div>
                  </td>
                  {
                    heading.map((h, index) => {
                      return (
                        <td key={key + '-' + index}>
                          <select className='form-control form-control-sm' defaultValue={''} onChange={(e) => handleSelectChange(key, h.name, e.target.value)}>
                            <option value='' disabled>-</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                          </select>
                        </td>
                      )
                    })
                  }

                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='mt-3 mb-4' style={{ textAlign: 'right' }}>
          <button className='btn btn-success btn-sm' onClick={onSubmit}>Simpan</button>
        </div>

        <pre className="p-4 bg-light">
          {json}
        </pre>
      </div>
    </div>
  );
}

export default App;
