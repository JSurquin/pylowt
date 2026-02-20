
import HelloWorld from "./components/HelloWorld.vue";
import Card from "./components/Card.vue";
import { fetchUsers } from "./utils/userFetch";

const Hello = () => {
    const [compteur, setCompteur] = useState(1);
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState('');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([{
      id: 1,
      title: "Test products",
    }, {
      id: 2,
      title: "Test product 2",
    }]);

    useEffect(() => {
      fetchUsers().then(data => {
        setUsers(data);
      });
    }, []);

    useEffect(() => {
      if (searchUsers.length > 3) {
        fetchUsers().then(data => {
          setUsers(data);
        });
      }
    }, [searchUsers]);

    const onIncrementFromCard = (newCount) => {
      setCompteur(newCount);
    }

  return (
    <div>
      <HelloWorld msg="Vite + Vue" />
      <Card title="Card Title" body="Card Body" footer="Card Footer" count={compteur} increment={onIncrementFromCard}>
        Hello
        Body
        Footer
      </Card>
      <input placeholder="search products" value={search} onChange={(e) => setSearch(e.target.value)}/>
      {products?.map(product => (
        <div key={product.id}>
          {product.title}
        </div>
      ))}
      <input placeholder="search users" value={searchUsers} onChange={(e) => setSearchUsers(e.target.value)}/>
      {users?.map(user => (
        <div key={user.id}>
          {user.username}
        </div>
      ))}
    </div>
  )
}