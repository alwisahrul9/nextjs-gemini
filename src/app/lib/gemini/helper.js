export function formatResponse(response) {
    // Mengganti double line break dengan paragraf baru
    let formatted = response.replace(/\n\n/g, '</p><p>');

    // Mengganti single line break dengan <br>
    formatted = formatted.replace(/\n/g, '<br><br>');

    // Mengganti tanda **bold** menjadi <b></b>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Mengganti tanda *italic* menjadi <i></i>
    formatted = formatted.replace(/\*(.*?)\*/g, '<i>$1</i>');

    // Membungkus seluruh teks dalam <p> jika belum ada tag
    formatted = `<p>${formatted}</p>`;

    return formatted;
}
