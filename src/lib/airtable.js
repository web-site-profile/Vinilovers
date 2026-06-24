export async function getProductos() {
  const token = import.meta.env.AIRTABLE_TOKEN;
  const baseId = import.meta.env.AIRTABLE_BASE_ID;
  const tableId = import.meta.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    throw new Error('Faltan variables de entorno de Airtable');
  }

  const url = new URL(`https://api.airtable.com/v0/${baseId}/${tableId}`);
  url.searchParams.append('filterByFormula', 'AND({Activo}=1)');

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Error al hacer fetch a Airtable: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data.records.map(record => ({
    id: record.id,
    idProducto: record.fields["ID del producto"],
    nombre: record.fields["Nombre"],
    artista: record.fields["Artista"],
    precio: record.fields["Precio"],
    categoria: record.fields["Categoría"],
    descripcion: record.fields["Descripción"],
    imagen: record.fields["Imagen"]?.[0]?.url ?? "/placeholder.jpg",
    destacado: record.fields["Destacado"] ?? false,
    stock: record.fields["Stock"] ?? "Disponible",
  }));
}
