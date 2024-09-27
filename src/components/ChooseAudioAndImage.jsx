import { FaRegFileAudio, FaRegFileImage } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setAudioBreakUrl, setAudioSessionUrl, setImageBreakUrl, setImageSessionUrl } from "../features/TimeManagement/timeManagementSlice";
import '../styles/ChooseAudio.scss';
import { useEffect } from "react";

export const ChooseAudioAndImage = () => {
    const dispatch = useDispatch();

    const imageAlert = async () => {
        return Swal.fire({
            title: "Pilih Image?",
            html: `
                <div id="choose-audio__container">
                    <p>Anda dapat memilih image yang akan ditampilkan selama sesi berlangsung dan saat sesi berakhir atau waktu istirahat. Jika tidak ada image yang dipilih, image default (dari Spongebob) akan digunakan</p>
                    <div id="choose-audio__alert">
                       <div class="input-item">
                            <label htmlFor="audioSession">Audio Session</label>
                            <input type="file" id="audioSession" accept="audio/*" />
                        </div>
                        <div class="input-item">
                            <label htmlFor="audioBreak">Audio Break</label>
                            <input type="file" id="audioBreak" accept="audio/*" />
                        </div>
                    </div>
                </div>
      `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const audioSessionFile = document.getElementById("audioSession").files[0];
                const audioBreakFile = document.getElementById("audioBreak").files[0];

                const audioSessionUrl = URL.createObjectURL(audioSessionFile);
                const audioBreakUrl = URL.createObjectURL(audioBreakFile);

                dispatch(setAudioSessionUrl(audioSessionUrl));
                dispatch(setAudioBreakUrl(audioBreakUrl));
            } else {
                dispatch(setAudioSessionUrl(null));
                dispatch(setAudioBreakUrl(null));
            }
        });
    }

    const audioAlert = async () => {
        return Swal.fire({
            title: "Pilih Audio?",
            html: `
                <div id="choose-audio__container">
                    <p>Anda dapat memilih audio yang akan diputar selama sesi berlangsung dan saat sesi berakhir atau waktu istirahat. Jika tidak ada audio yang dipilih, audio default (dari Spongebob) akan digunakan</p>
                    <div id="choose-audio__alert">
                        <div class="input-item">
                            <label htmlFor="audioSession">Audio Session</label>
                            <input type="file" id="audioSession" accept="audio/*" />
                        </div>
                        <div class="input-item">
                            <label htmlFor="audioBreak">Audio Break</label>
                            <input type="file" id="audioBreak" accept="audio/*" />
                        </div>
                    </div>
                </div>
      `,
            showDenyButton: true,
            confirmButtonText: "Simpan",
            denyButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const audioSessionFile = document.getElementById("audioSession").files[0];
                const audioBreakFile = document.getElementById("audioBreak").files[0];

                const audioSessionUrl = URL.createObjectURL(audioSessionFile);
                const audioBreakUrl = URL.createObjectURL(audioBreakFile);

                dispatch(setAudioSessionUrl(audioSessionUrl));
                dispatch(setAudioBreakUrl(audioBreakUrl));
            } else {
                dispatch(setAudioSessionUrl(null));
                dispatch(setAudioBreakUrl(null));
            }
        })
    }

    useEffect(() => {
        const showAlerts = async () => {
            await audioAlert();  // Menunggu audioAlert selesai
            // Menjalankan imageAlert setelahnya
        };

        showAlerts().then(() => imageAlert());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleAudioClick = () => {
        Swal.fire({
            title: "Pilih Audio",
            html: `
            <div id="choose-audio__container">
                <div id="choose-audio__alert">
                    <div class="input-item">
                        <label htmlFor="audioSession">Audio Session</label>
                        <input type="file" id="audioSession" accept="audio/*" />
                    </div>
                    <div class="input-item">
                        <label htmlFor="audioBreak">Audio Break</label>
                        <input type="file" id="audioBreak" accept="audio/*" />
                    </div>
                </div>
            </div>
      `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const audioSessionFile = document.getElementById("audioSession").files[0];
                const audioBreakFile = document.getElementById("audioBreak").files[0];

                const audioSessionUrl = URL.createObjectURL(audioSessionFile);
                const audioBreakUrl = URL.createObjectURL(audioBreakFile);

                dispatch(setAudioSessionUrl(audioSessionUrl));
                dispatch(setAudioBreakUrl(audioBreakUrl));
            }
        });
    };

    const handleImageClick = () => {
        Swal.fire({
            title: "Pilih Image",
            html: `
            <div id="choose-audio__container">
                <div id="choose-audio__alert">
                    <div class="input-item">
                        <label htmlFor="imageSession">Image Session</label>
                        <input type="file" id="imageSession" accept="image/*" />
                    </div>
                    <div class="input-item">
                        <label htmlFor="imageBreak">Image Break</label>
                        <input type="file" id="imageBreak" accept="image/*" />
                    </div>
                </div>
            </div>
      `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const imageSessionFile = document.getElementById("imageSession").files[0];
                const imageBreakFile = document.getElementById("imageBreak").files[0];

                if (imageSessionFile) {
                    const imageSessionUrl = URL.createObjectURL(imageSessionFile);
                    dispatch(setImageSessionUrl(imageSessionUrl));
                }

                if (imageBreakFile) {
                    const imageBreakUrl = URL.createObjectURL(imageBreakFile);
                    dispatch(setImageBreakUrl(imageBreakUrl));
                }

            }
        });
    };

    return (
        <div className="fixed right-5 bottom-20 flex items-center gap-4">
            <FaRegFileImage onClick={handleImageClick} className="w-10 h-10" />
            <FaRegFileAudio onClick={handleAudioClick} className="w-10 h-10" />
        </div>
    );
};