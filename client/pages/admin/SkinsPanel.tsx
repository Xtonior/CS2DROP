import React, { useState, useEffect } from "react"
import type { SkinItem } from '../../src/types'
import { ItemRarity } from '../../src/types'

export const SkinsPanel: React.FC = () => {
    const [skins, setSkins] = useState<SkinItem[]>([]);
    const [name, setName] = useState('');
    const [rarity, setRarity] = useState<ItemRarity>(ItemRarity.ConsumerGrade);
    const [collection, setCollection] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/getskins')
            .then(r => r.json())
            .then(setSkins)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting form', { name, rarity, collection, price, image });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('rarity', rarity);
        formData.append('collection', collection);
        formData.append('price', price.toString());
        if (image) formData.append('file', image);

        await fetch('/api/AddSkin', {
            method: 'POST',
            body: formData,
        });

        const updated = await fetch('/api/getskins').then(r => r.json());
        setSkins(updated);
    };

    useEffect(() => {
        fetch('/api/GetSkinImagesDir')
            .then(res => res.json())
            .then(setImageUrls);
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Admin Panel</h2>

            <form onSubmit={handleSubmit}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                <select value={rarity} onChange={e => setRarity(e.target.value as ItemRarity)} required>
                    {Object.values(ItemRarity).map((rar) => (
                        <option key={rar} value={rar}>
                            {rar.toString()}
                        </option>
                    ))}
                </select>
                <input value={collection} onChange={e => setCollection(e.target.value)} placeholder="Collection" required />
                <input type="number" step="0.01" value={price} onChange={e => setPrice(+e.target.value)} placeholder="Price" required />
                <input type="file" onChange={e => setImage(e.target.files?.[0] ?? null)}>
                </input>
                <button type="submit">Add</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Rarity</th>
                        <th>Collection</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {skins.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.rarity}</td>
                            <td>{s.collection}</td>
                            <td>{s.price}</td>
                            <td>
                                {<img src={imageUrls + s.imagePath} alt={imageUrls + s.imagePath} style={{ width: '100px', height: '100px', objectFit: "fill" }} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}