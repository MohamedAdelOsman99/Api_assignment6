
export const logoutUser = (req, res) => {
    res.status(200).json({
        status: 'success',
        code: '200',
        date : new Date(),
        message: 'Logged out successfully'
    });
};