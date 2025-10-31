import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { SkinItem } from '../src/types';

interface Props {
    skins: SkinItem[];
    resultSkin: SkinItem | null;
    onAnimationEnd?: () => void;
}

export const CaseRoll: React.FC<Props> = ({ skins, resultSkin, onAnimationEnd }) => {
    const [endPos, setEndPos] = useState(0);
    const [repeatedSkins, setRepeatedSkins] = useState<SkinItem[]>([]);

    const repeatCount = 15; // сколько скинов будет в рулетке
    const extraAfter = 5;    // сколько скинов после выигранного

    const itemWidth = 160;
    const gap = 8;
    const containerWidth = 480;

    useEffect(() => {
        if (!resultSkin || skins.length === 0) return;

        const preSkins: SkinItem[] = [];
        for (let i = 0; i < repeatCount - 1; i++) {
            const candidates = skins.filter(s => s.id !== resultSkin.id);
            const rand = candidates[Math.floor(Math.random() * candidates.length)];
            preSkins.push(rand);
        }

        const mainSkin = resultSkin;

        const postSkins: SkinItem[] = [];
        for (let i = 0; i < extraAfter; i++) {
            const rand = skins[Math.floor(Math.random() * skins.length)];
            postSkins.push(rand);
        }

        const fullSkins = [...preSkins, mainSkin, ...postSkins];
        setRepeatedSkins(fullSkins);

        const resultIndex = (preSkins.length) / 2;
        const centerOffset = (itemWidth + gap) * resultIndex + itemWidth / 2 - containerWidth / 2;
        setEndPos(centerOffset);
    }, [resultSkin, skins]);

    return (
        <div style={{
            overflow: 'hidden',
            width: 480,
            margin: '20px auto',
            position: 'relative',
            border: '2px solid #4f46e5',
            borderRadius: 10,
            padding: 8
        }}>
            <motion.div
                animate={{ x: -endPos }}
                transition={{ ease: "linear" }}
                onAnimationComplete={onAnimationEnd}
                style={{ display: 'flex', gap }}
            >
                {repeatedSkins.map((skin, idx) => (
                    <div key={idx} style={{ width: 160, textAlign: 'center' }}>
                        <img src={skin.imagePath} alt={skin.name} style={{ width: '100%', borderRadius: 10 }} />
                        <p>{skin.name}</p>
                    </div>
                ))}
            </motion.div>

            {/* Центральная полоса */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    width: 2,
                    background: '#4f46e5',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                }}
            />
        </div>
    );
};
