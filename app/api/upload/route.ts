function csvToJson(csv: string) {
  const lines = csv.split('\n');

  const result = [];

  const headers = lines[0].split(',').map((header) => {
    return header?.trim();
  });

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj: { [key: string]: string } = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]?.trim();
    }

    result.push(obj);
  }

  return JSON.stringify(result);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('csvFile');

  const data = await (file instanceof Blob ? file.text() : '');

  const json = csvToJson(data);

  return new Response(json, {
    headers: { 'content-type': 'application/json' },
  });
}
